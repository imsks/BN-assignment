const envName = "dev";

const dev = {
    REACT_APP_NODE_API_URL: "http://localhost:8000",
};

const prod = {
    REACT_APP_NODE_API_URL: "",
};

const env = envName === "prod" ? prod : dev;

export default env;
