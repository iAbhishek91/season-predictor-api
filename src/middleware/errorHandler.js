export default validRoutes => (_, res) => res.status(301).json(validRoutes);
