function getEnvironmentVariable(variableName) {
  return process.env[variableName];
}

function getEnvironmentVariableOrErrorOut(variableName) {
  const value = getEnvironmentVariable(variableName);
  if (!value) throw new Error(`Environment variable "${variableName}" not found`);
  else return value;
}

function ensureEnvironmentVariables(variableNames) {
  variableNames.forEach((vn) => {
    getEnvironmentVariableOrErrorOut(vn);
  });
}

exports.ensureEnvironmentVariables = ensureEnvironmentVariables;
