exports.levenshteinDistance = function (a, b) {
    const m = a.length;
    const n = b.length;
    
    // Initialize a matrix with zeros
    const d = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
    
    // If one string is empty, return the length of the other string
    if (m === 0) {
      return n;
    }
    
    if (n === 0) {
      return m;
    }
    
    // Initialize the first row and column of the matrix
    for (let i = 0; i <= m; i++) {
      d[i][0] = i;
    }
    
    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }
    
    // Calculate the Levenshtein distance between the two strings
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(
          d[i - 1][j] + 1, // Deletion
          d[i][j - 1] + 1, // Insertion
          d[i - 1][j - 1] + cost // Substitution
        );
      }
    }
    
    // Return the Levenshtein distance
    return d[m][n];
  }
  