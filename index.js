const core = require('@actions/core');

try {
  let branchName = '';
  let shouldDeploy = false;
  const eventName = process.env.GITHUB_EVENT_NAME;

  // Fetch Branch Name
  if (eventName === 'pull_request') {
    branchName = process.env.GITHUB_HEAD_REF;
  } else if (eventName === 'push') {
    branchName = process.env.GITHUB_REF.replace('refs/heads/', '');
  }

  // Validate and set branch Name
  const validBranchRegex = /(^(feature|bugfix|hotfix|onprem)\/(LSP|CB|AQRE|LP|ASE)-[0-9]{1,5}\/[0-9a-zA-Z_-]+$)|(^(development|staging|production|qa|labs)$)/;
  if (!validBranchRegex.test(branchName)) {
    core.setFailed(`Branch Name should be in the regex format ${validBranchRegex}`);
  } else {
    core.setOutput('branch_name', branchName);
  }

  // Calculate should_deploy and set as output
  const deployableBranches = ['development', 'qa', 'staging', 'production', 'labs'];
  if(deployableBranches.includes(branchName)) {
    shouldDeploy = true;
  }
  core.setOutput('should_deploy', shouldDeploy);
} catch (error) {
  core.setFailed(error.message);
}