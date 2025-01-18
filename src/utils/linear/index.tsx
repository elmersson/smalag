import { LinearClient } from "@linear/sdk";

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY!,
});

export async function fetchIssuesFromProject(projectKey: string) {
  const project = await linearClient.project(projectKey);

  if (!project) {
    throw new Error(`Project with key "${projectKey}" not found.`);
  }
  const { nodes } = await project.issues();
  return nodes;
}
