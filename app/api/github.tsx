'use server';
import axios from 'axios';
import { auth } from "@/auth"

const API_BASE_URL = 'https://api.github.com/graphql';

// Replace 'YOUR_GITHUB_TOKEN' with your actual GitHub Personal Access Token
// const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';

// Define the GraphQL query to fetch issues
const ISSUES_QUERY = `
  query($owner: String!, $repo: String!, $after: String) {
    repository(owner: $owner, name: $repo) {
      issues(states: [OPEN], first: 10, after: $after) {
        nodes {
          id
          title
          body
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

// Define the GraphQL query to fetch a single issue by ID
const ISSUE_BY_ID_QUERY = `
  query($owner: String!, $repo: String!, $issueId: ID!) {
    repository(owner: $owner, name: $repo) {
      issueOrPullRequest(number: $issueId) {
        id
        title
        body
      }
    }
  }
`;

interface Post {
  id: string;
  title: string;
  body: string;
}
interface fetchPostsProps {
  cursor: string;
}
interface FormattedIssue {
  id: string;
  title: string;
  body: string;
}

interface FormattedPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

interface FormattedResponse {
  issues: FormattedIssue[];
  pageInfo: FormattedPageInfo;
}
 
export const fetchPosts = async ({ cursor }: fetchPostsProps): Promise<FormattedResponse | null> => {
  const session = await auth();
  
  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: ISSUES_QUERY,
        variables: {
          owner: 'Yao-Wen-Chang',
          repo: '2024-Dcard_Frontend',
          after: cursor !== '' ? cursor : undefined
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    // console.log(response.data.data.repository.issues);
    const issues = response.data.data.repository.issues.nodes;
    const pageInfo = response.data.data.repository.issues.pageInfo;
    
    // return issues.map((issue: any) => ({
    //   id: issue.id,
    //   title: issue.title,
    //   body: issue.body,
    // }));
    const formattedPageInfo: FormattedPageInfo = pageInfo;
    // console.log(formattedPageInfo)
    const formattedIssues: FormattedIssue[] = issues.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      body: issue.body,
    }));
  
    return {
      issues: formattedIssues,
      pageInfo: formattedPageInfo,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
};

interface fetchPostByIdProps{
  id: number;
}

export const fetchPostById = async ({id}: fetchPostByIdProps): Promise<Post | null> => {
  const session = await auth();
  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: ISSUE_BY_ID_QUERY,
        variables: {
          owner: 'Yao-Wen-Chang',
          repo: '2024-Dcard_Frontend',
          issueId: id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );

    const issue = response.data.data.repository.issueOrPullRequest;

    if (issue) {
      return {
        id: issue.id,
        title: issue.title,
        body: issue.body,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
};

interface findRepoIdProps {
  owner: string,
  repo: string
}


const findRepoId = async ({owner, repo}: findRepoIdProps): Promise<string | null> => {
  const session = await auth();
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        id
      }
    }
  `;
  const variables = {
    owner: owner,
    repo: repo,
  };

  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    // console.log('Find Repository ID:', response?.data?.data?.repository?.id);
    return response?.data?.data?.repository?.id

  } catch (error) {
    console.error('Error create issue:', error);
    return null;
  }

}


interface createIssueProps {
  title: string,
  content: string
  owner: string,
  repo: string
}

// Create an issue
export const createIssue = async ({title, content, owner, repo}: createIssueProps) => {
  const session = await auth();
  const query = `
    mutation($repoId: ID!, $title: String!, $body: String!) {
      createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {
        issue {
          id
          title
          body 
        }
      }
    }
  `;
  const repoId = await findRepoId({
    owner: owner,
    repo: repo
  })
  // console.log(repoId);
  const variables = {
    repoId: repoId, 
    title: title,
    body: content
  };
  // console.log(variables);
  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    console.log('response:', response)
    console.log('Created Issue:', response?.data?.errors);

  } catch (error) {
    console.error('Error create issue:', error);
    return null;
  }
};

interface closeIssueProps {
  issueId: string
}

export const closeIssue = async ({issueId} : closeIssueProps) => {
  const session = await auth();
  const query = `
    mutation CloseIssue($issueId: ID!) {
      closeIssue(input: { issueId: $issueId }) {
        issue {
          id
          title
          state
        }
      }
    }
  `;
  const variables = {
    issueId: issueId
  };

  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    // console.log('response:', response?.data.data.closeIssue)
    // console.log('Closed Issue:', response?.data?.errors);

  } catch (error) {
    console.error('Error close issue:', error);
    return null;
  }
};

  
interface updateIssueProps { 
  issueId: string;
  title: string;
  body: string;
}


export const updateIssue = async ({issueId, title, body}: updateIssueProps) => {
  const session = await auth();
  console.log(issueId)
  const query = `
    mutation UpdateIssue($issueId: ID!, $title: String!, $body: String!) {
      updateIssue(input: {id: $issueId, title: $title, body: $body}) {
        issue {
          id
          title
          body
        }
      }
    }
  `;
  const variables = {
    issueId: issueId,
    title: title,
    body: body,
  };

  try {
    const response = await axios.post(
      API_BASE_URL,
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    console.log('response:', response?.data?.errors)
    // console.log('Closed Issue:', response?.data?.errors);

  } catch (error) {
    console.error('Error update issue:', error);
    return null;
  }


}


