import validator from "validator";

export const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong!");
    }
};

export const validateLoginData = (req) => {
    const { emailId, password } = req.body;

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Enter Valid Email");
    } else if (!password) {
        throw new Error("Enter Password");
    }
};

export const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "skills",
        "age",
        "about",
        "gender",
        "photoUrl",
    ];

    // For Every Key check if it exist in allowed Fields or not
    const isEditAllowed = Object.keys(req.body).every((field) => {
        return allowedEditFields.includes(field);
    });
    if (req.body?.skills?.length > 10) {
        throw new Error("Number of Skills should not more than 10.");
    }

    return isEditAllowed;
};

export const validatePasswordProfileData = (req) => {
    // Validate Password
    if (!req.body.password || !validator.isStrongPassword(req.body.password)) {
        throw new Error("Required Valid Password.");
    }
};
