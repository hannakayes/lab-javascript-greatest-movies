// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  return movies.map(movie => movie.director);
}

// Bonus - Iteration 1.1: Clean the array of directors
function getUniqueDirectors(movies) {
  const allDirectors = getAllDirectors(movies);
  return [...new Set(allDirectors)];
}

// Iteration 2: Steven Spielberg. The best?
function howManyMovies(movies) {
  return movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average
function scoresAverage(movies) {
  if (movies.length === 0) return 0;

  const totalScore = movies.reduce((sum, movie) => {
    if (typeof movie.score === 'number') {
      return sum + movie.score;
    }
    return sum;
  }, 0);

  const averageScore = totalScore / movies.length;
  return parseFloat(averageScore.toFixed(2));
}

// Iteration 4: Drama movies
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Order by year
function orderByYear(movies) {
  const moviesCopy = movies.slice();
  return moviesCopy.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic order
function orderAlphabetically(movies) {
  const titles = movies.map(movie => movie.title);
  titles.sort((a, b) => a.localeCompare(b));
  return titles.slice(0, 20);
}

// BONUS - Iteration 7: Time format
function turnHoursToMinutes(movies) {
  const moviesCopy = movies.map(movie => ({ ...movie }));

  moviesCopy.forEach(movie => {
    const duration = movie.duration;
    let minutes = 0;

    const hoursMatch = duration.match(/(\d+)h/);
    if (hoursMatch) {
      minutes += parseInt(hoursMatch[1]) * 60;
    }

    const minutesMatch = duration.match(/(\d+)min/);
    if (minutesMatch) {
      minutes += parseInt(minutesMatch[1]);
    }

    movie.duration = minutes;
  });

  return moviesCopy;
}

// BONUS - Iteration 8: Best yearly score average
function bestYearAvg(movies) {
  if (movies.length === 0) return null;

  const calculateYearAvg = scores => scores.reduce((sum, score) => sum + score, 0) / scores.length;

  const yearScores = movies.reduce((acc, { year, score }) => {
    acc[year] = acc[year] || [];
    acc[year].push(score);
    return acc;
  }, {});

  const getBestYear = () => {
    let bestYear = null, bestAverage = 0;

    for (const year in yearScores) {
      const average = calculateYearAvg(yearScores[year]);
      if (average > bestAverage || (average === bestAverage && year < bestYear)) {
        bestAverage = average;
        bestYear = year;
      }
    }
    return { year: bestYear, average: bestAverage };
  };

  return movies.length === 1
    ? `The best year was ${movies[0].year} with an average score of ${movies[0].score}`
    : `The best year was ${getBestYear().year} with an average score of ${getBestYear().average.toFixed(1)}`;
}

