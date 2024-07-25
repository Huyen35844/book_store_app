import * as yup from 'yup';

export const validate = async (schema, value) => {
    try {
        //strict (true) means: schema (age, name) but data (age, name, hobby) => fine
        const data = await schema.validate(value, { strict: true, abortEarly: false });
        return { values: data }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            //set abortEarly as true, yup catches the error not in order but one by one
            //set abortEarly as false, yup catches all the errors at once (5 errors occur)
            //set abortEarly as false and error.inner[0] to only get the first error and in order
            return { error: error.inner[0].message }
        } else {
            return { error: error.message }
        }
    }
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/;

const phoneNumberRegex = /^(?:\+84|0)(?:\d{9}|\d{8})$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
    return this.matches(emailRegex, {
        message,
        name: "email",
        excludeEmptyString: true
    })
})

const email = { email: yup.string().email("Invalid email!").required("Email is missing!") }

const password = {
    password: yup
        .string()
        .required("Password is missing!")
        .min(8, "Password should be at least 8 chars long!")
        .matches(passwordRegex, "Password is too simple!"),
}

const name = { name: yup.string().required("Name is missing!") }

//The .oneOf() method is used to specify a list of allowed values, and Yup.ref() is used to reference another field in the schema.
const confirmPassword = { confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match!').required("Confirm Password is missing!") }

const address = {
    address: yup
        .string()
        .required("Address is missing!")
}

const phoneNumber = {
    phoneNumber: yup.string().required("Phone number is missing!").matches(phoneNumberRegex, "Phone number is invalid!")
}

export const signUpSchema = yup.object({
    ...name,
    ...email,
    ...password,
    ...confirmPassword
})

export const updateProfileSchema = yup.object({
    ...name,
    ...address,
    ...phoneNumber
})




