const core = require('@actions/core');

try {
  let branchName = '';
  const eventName = process.env.GITHUB_EVENT_NAME;

  if (eventName === 'pull_request') {
    branchName = process.env.GITHUB_HEAD_REF;
  } else if (eventName === 'push') {
    branchName = process.env.GITHUB_REF.replace('refs/heads/', '');
  }

  core.setOutput('branch_name', branchName);
  const validBranchRegex = /(^(feature|bugfix|hotfix)\/(LSP|CB)-[0-9]{1,5}\/[0-9a-zA-Z_-]+$)|(^(development|staging|production|qa|labs)$)/;

  if (!validBranchRegex.test(branchName)) {
    core.setFailed(`Branch Name should be in the regex format ${validBranchRegex}`);
  }
} catch (error) {
  core.setFailed(error.message);
}