# Assignment-Fetcher
This extension provides basic functionality like - fetch, switch, submit, delete, auto commit on save. 

## Requirements
1. Git should be installed and working with vscode
2. Student should make a repository in github with default branch as `main` and clone the repository into a desired directory.<br/>Use this command in the preferred directory: `git clone https://github.com/username/reponame.git`
3. Extension settings should be filled completely in VS Code.

## Features
1. Fetch Assignment: fetches the specified assignment branch from the lab repository to local repository and creates a branch for the assignment in the student's remote repository as well. Password will be prompted.
2. Switch to an Assignment: jumps to the specific assignment(branch) if it exisits.
3. Delete an Assignment: deletes the remote and local assignment(branch) if both exists. Password will be prompted.
4. Submit Progress: pushes the cumulated commits of the current assignment(branch) to the remote repository. Password will be prompted.
5. Auto commit: save event triggers a commit for the current assignment(branch). 

Feature 1 to 4 can be called using `ctrl+shift+p` and then typing the required feature to be fired. Feature 5 is always on by default.

## Extension Settings
1. Github Username: Your github username
2. Lab Repository: Github link to Lab Repository
3. Local Repository Path: Absolute Local Repository Path. Use `pwd` in terminal opened in required directory to get it's absolute path.
4. Submission Repository Name: Name of the repository to which the assignments are to be fetched.
