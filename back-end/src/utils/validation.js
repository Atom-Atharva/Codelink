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

    if (!emailId && !validator.isEmail(emailId)) {
        throw new Error("Enter Valid Email");
    } else if (!password) {
        throw new Error("Enter Password");
    }
};
