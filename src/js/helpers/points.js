// Calculate mastery points available based on char level and renown level
export function calculateMasteryPoints(level, renown) {
  let points = 0;
      if (level > 21) {
        points = 29;
      } else if (level > 20) {
        points = 26;
      } else if (level > 19) {
        points = 23;
      } else if (level > 18) {
        points = 20;
      } else if (level > 17) {
        points = 17;
      } else if (level > 16) {
        points = 14;
      } else if (level > 15) {
        points = 11;
      } else if (level > 14) {
        points = 8;
      } else if (level > 12) {
        points = 7;
      } else if (level > 10) {
        points = 6;
      } else if (level > 8) {
        points = 5;
      } else if (level > 6) {
        points = 4;
      } else if (level > 4) {
        points = 3;
      } else if (level > 2) {
        points = 2;
      } else {
        points = 1;
      }
    switch (renown) {
      case 40:
        points = points + 0;
        break;
      case 50:
        points = points + 0;
        break;
      case 60:
        points = points + 0;
        break;
      case 70:
        points = points + 0;
        break;
      default:
        break;
    }
  }
  // return mastery points
  return points;
}
