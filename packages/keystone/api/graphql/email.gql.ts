export const GET_RECEIVERS = `
query getReceivers {
  allReceivers(where: {enable: true}) {
    email,
    enable
  }
}
`;
