export const stepValidators = {
 personalInfo: (data) => {
    const errors = {};

    // Basic Required Checks
    if (!data.preferredLanguage) errors.preferredLanguage = "Select a language";
    if (!data.gender) errors.gender = "Select your gender";
    if (!data.journeyType) errors.journeyType = "Select a journey type";
    if (!data.country) errors.country = "Country is required";
    if (!data.state) errors.state = "State is required";
    if (!data.city) errors.city = "City is required";

    // ✅ Date of Birth & Age Validation (Best Approach)
    if (!data.dateOfBirth) {
        errors.dateOfBirth = "Date of Birth is required";
    } else {
        const dob = new Date(data.dateOfBirth);
        const today = new Date();

        // Check if date is in the future
        if (dob > today) {
            errors.dateOfBirth = "Date of birth cannot be in the future";
        } else {
            // Age Calculation Logic
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            
            // Adjust age if birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            // Minimum 16 Years Check
            if (age < 14) {
                errors.dateOfBirth = "You must be at least 14 years old to join.";
            }
        }
    }

    return errors;
},


  learningJourney: (data) => {
  const errors = {};

  if (!data.educationLevel) {
    errors.educationLevel = "Education Level is required";
  }

  // Education Level = Other
  if (data.educationLevel === "Other" && !data.customEducationLevel) {
    errors.customEducationLevel = "Please specify education level";
  }

  // Field of Study ONLY when educationLevel is NOT Other
  if (data.educationLevel !== "Other" && !data.fieldOfStudy) {
    errors.fieldOfStudy = "Field of Study is required";
  }

  if (!data.degree) {
    errors.degree = "Degree is required";
  }

  if (data.degree === "Other" && !data.customDegree) {
    errors.customDegree = "Please specify degree";
  }

  if (!data.specialization) {
    errors.specialization = "Specialization is required";
  }

  if (!data.learningMode) {
    errors.learningMode = "Learning Mode is required";
  }

  return errors;
},
  recentExperience: (data) => {
    const errors = {};
    if (!data.jobTitle?.trim()) errors.jobTitle = "Job Title is required";
    if (!data.currentRole?.trim()) errors.currentRole = "Current Role is required";
    if (!data.experienceYears) errors.experienceYears = "Experience Years is required";
    

// Skills Validation (Min 3, Max 10)
if (!data.skills || data.skills.length < 3) {
  errors.skills = "Please select at least 3 skills";
} else if (data.skills.length > 7) {
  errors.skills = "You can select a maximum of 7 skills";
}

    // Portfolio is OPTIONAL, so no check here.
    
    return errors;
},

  careerExpectations: (data) => {
    const errors = {};
    if (!data.LookingPosition) errors.LookingPosition = "Looking Position is required";
    if (!data.industry) errors.industry = "Industry is required";
    if (!data.availability) errors.availability = "Availability is required";
    if (!data.preferredJobRoles || data.preferredJobRoles.length === 0) {
      errors.preferredJobRoles = "Select at least one role";
    }
    return errors;
  },


  jobAlertPreferences: (data) => {
    const errors = {};
    if (!data.preferredRoleTypes) errors.preferredRoleTypes = "Select a role type"; // Check if string/array
    if (!data.locationPreference) errors.locationPreference = "Location is required";
    if (!data.targetRole) errors.targetRole = "Target Role is required";
    
    // Check min value because max can be null for "2000000+"
    if (data.salaryRange?.min === null || data.salaryRange?.min === undefined) {
       errors.salaryRange = "Salary range is required";
    }
    
    return errors;
},

interestsAndPreferences: (data) => {
    const errors = {};

    // 1. Why Joining
    if (!data.whyJoining) {
        errors.whyJoining = "Please select why you are joining";
    }

    // 2. Content Style
    if (!data.contentStylePreference) {
        errors.contentStylePreference = "Please select a content style preference";
    }

    // 3. Community Interest (Array Check: Must have length AND not be an empty string)
    if (!data.communityInterestClusters?.length || data.communityInterestClusters[0] === "") {
        errors.communityInterestClusters = "Please select at least one interest cluster";
    }

    // 4. Contribution Level
    return errors;
  },

  collabConnections: (data) => {
    const errors = {};
    
    // ✅ Check 1: Kya array exist karta hai?
    // ✅ Check 2: Kya uski length 0 hai? (Unfollow karne par 0 ho jati hai)
    if (!data?.followedColleges || data.followedColleges.length === 0) {
      errors.followedColleges = "At least one college must be followed.";
    }
    
    return errors;
  },

};