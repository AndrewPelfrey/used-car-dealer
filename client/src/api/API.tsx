import { Candidate } from "../interfaces/Candidate.interface";

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("GitHub API Error:", data);
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    return {};
  }
};

const fetchRandomGithubUser = async (): Promise<Candidate> => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error("GitHub token is missing! Check your .env file.");
  }

  // Generate a random "since" value for randomness
  const randomSince = Math.floor(Math.random() * 10000);

  const response = await fetch(`https://api.github.com/users?since=${randomSince}&per_page=1`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`, // Use the token
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("GitHub API Error:", errorData);
    throw new Error(`Failed to fetch random user: ${response.status} ${response.statusText}`);
  }

  const users = await response.json();
  return users[0] as Candidate; // Return the first user from the list
};


export { searchGithub, searchGithubUser, fetchRandomGithubUser };