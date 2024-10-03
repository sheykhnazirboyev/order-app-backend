
export default function checkConfig() {
  if (!process.env.JWT_PRIVATE_KEY) {
    throw new error("No JWT_PRIVATE_KEY env variable set");
  }
}
