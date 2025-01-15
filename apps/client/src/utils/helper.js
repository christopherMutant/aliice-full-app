class helper {
  /**
   * Converts a date string to the format 'YYYY-MM-DD'.
   * @param {string|Date} input - The input date string or Date object.
   * @returns {string} - The formatted date string.
   */
  static formatDateToYYYYMMDD(input) {
    const date = new Date(input)
    if (isNaN(date)) {
      throw new Error('Invalid date input.')
    }
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  /**
   * Calculates the age based on a given birth date.
   * If the age is less than 1 month, it returns the age in weeks or days.
   * @param {string|Date} birthDateInput - The birth date string or Date object.
   * @returns {string|number} - The calculated age. Returns a number for years, or a string for weeks/days if under 1 month.
   */
  static calculateAge(birthDateInput) {
    const birthDate = new Date(birthDateInput)
    if (isNaN(birthDate)) {
      throw new Error('Invalid birth date input.')
    }

    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()

    const hasNotHadBirthdayThisYear =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())

    // If the age is less than 1 year, adjust for birthday not yet occurred
    if (hasNotHadBirthdayThisYear) {
      age -= 1
    }

    // If age is less than 1 year, calculate in weeks or days
    if (age === 0) {
      const timeDifference = today - birthDate
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

      if (daysDifference < 7) {
        return `${daysDifference} day${daysDifference === 1 ? '' : 's'}`
      }

      const weeksDifference = Math.floor(daysDifference / 7)
      if (weeksDifference < 4) {
        return `${weeksDifference} week${weeksDifference === 1 ? '' : 's'}`
      }

      // If 4 weeks or more but less than 1 year, calculate in months
      const monthsDifference =
        today.getMonth() -
        birthDate.getMonth() +
        (today.getFullYear() - birthDate.getFullYear()) * 12

      return `${monthsDifference} month${monthsDifference === 1 ? '' : 's'}`
    }

    return age // Return the age in years if 1 year or more
  }
}

export default helper
