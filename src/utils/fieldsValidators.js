export const validators = {
    firstName: (value) => {
        if (!value.trim()) {
            return "First name is required";
        }

        return "";
    },

    lastName: (value) => {
        if (!value.trim()) {
            return "Last name is required";
        }

        return "";
    },

    day: (value) => {
        if (!value.trim()) {
            return "Day is required";
        }

        if (Number(value) > 31) {
            return "Day cannot be greater than 31";
        }

        return "";
    },

    month: (value) => {
        if (!value.trim()) {
            return "Month is required";
        }

        if (Number(value) > 12) {
            return "Month cannot be greater than 12";
        }

        return "";
    },

    year: (value) => {
        if (!value.trim()) {
            return "Year is required";
        }

        const currentYear = new Date().getFullYear();
        const age = currentYear - Number(value);

        if (age < 21) {
            return "The minimum registration age is 21 years";
        }

        if (age > 60) {
            return "The maximum registration age is 60 years";
        }

        return "";
    },

    religion: (value) => {
        if (!value.trim()) {
            return "Religion is required";
        }

        return "";
    },

    community: (value) => {
        if (!value.trim()) {
            return "Community is required";
        }

        return "";
    },

    email: (value) => {
        if (!value.trim()) {
            return "Email address is required";
        }

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
        }

        return "";
    },

    mobile: (value) => {
        if (!value.trim()) {
            return "Mobile number is required";
        }

        if (!/^[6-9]\d{9}$/.test(value)) {
            return "Please enter a valid 10-digit mobile number";
        }

        return "";
    },

    password: (value) => {
        if (!value.trim()) {
            return "Password is required";
        }

        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }

        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }

        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }

        if (!/\d/.test(value)) {
            return "Password must contain at least one number";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return "Password must contain at least one special character";
        }

        return "";
    },

    confirmPassword: (value, password) => {
        if (!value.trim()) {
            return "Confirm password is required";
        }

        if (value !== password) {
            return "Passwords do not match";
        }

        return "";
    }
};