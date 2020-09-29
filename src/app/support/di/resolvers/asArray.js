const asArray = (resolvers) => {
  return {
    resolve: (container, opts) =>
      resolvers.map((r) => container.build(r, opts))
  }
}

module.exports = asArray
