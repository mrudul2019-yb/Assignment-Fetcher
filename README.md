# Assignment-Fetcher
This extension provides basic functionality like - fetch, switch assigment, change git user, submit, delete, auto commit and active time logging on save. 

## Requirements
1. Git should be installed and working with vscode
2. Student should make a repository in github with default branch as `main` and clone the repository into a desired directory.<br/>Use this command in the preferred directory: `git clone https://github.com/username/reponame.git`
3. Extension settings should be filled completely in VS Code.

## Features
1. `Fetch Assignment`: fetches the specified assignment branch from the lab repository to local repository and creates a branch for the assignment in the student's remote repository as well. 
2. `Switch to an Assignment`: jumps to the specific assignment(branch) if it exisits.
3. `Delete an Assignment`: deletes the remote and local assignment(branch) if both exists. 
4. `Submit Progress`: pushes the cumulated commits of the current assignment(branch) to the remote repository. 
5. `Change Git User`: github access token will be prompted. Access token can be obtained from github -> settings -> developer settings -> personal access token
NOTE: token should have atleast full repo access. 
6. `Auto commit`: save event triggers a commit for the current assignment(branch). 
7. `Active Time`: calculates time spent on the assignment, user considered inactive after `Timer Shutdown Interval`. 

Feature 1 to 5 can be called using `ctrl+shift+p` and then typing the required feature to be fired. 
Feature 6 is always on.
Feature 7 requires the local repository to have `studentData.json` with a field of `activeTime`.

## Extension Settings
1. `Github Username`: Your github username
2. `Lab Repository`: Github link to Lab Repository
3. `Local Repository Path`: Absolute Local Repository Path. Use `pwd` in terminal opened in required directory to get it's absolute path.
4. `Submission Repository Name`: Name(not link) of the repository to which the assignments are to be fetched.
5. `Timer Shutdown Interval`: Minutes after which user is marked inactive.

After changing settings, restarting VS Code is required.
