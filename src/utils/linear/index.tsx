import { LinearClient } from "@linear/sdk";

const linearClient = new LinearClient({
  apiKey: process.env.NEXT_PUBLIC_LINEAR_API_KEY || "",
});

export async function fetchIssuesFromProject(projectKey: string) {
  const project = await linearClient.project(projectKey);

  if (!project) {
    throw new Error(`Project with key "${projectKey}" not found.`);
  }
  const { nodes } = await project.issues({
    first: 100,
    filter: {
      state: {
        type: { in: ["backlog", "unstarted", "in-progress"] },
      },
    },
  });
  return nodes;
}

export async function fetchAllProjects() {
  const { nodes } = await linearClient.projects();
  return nodes;
}
