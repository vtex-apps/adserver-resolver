export const getNewtailPublisherId = async (ctx: Context) => {
  const settings = await ctx.clients.apps.getAppSettings(
    'vtex.adserver-resolver'
  )

  const publisherId = settings?.newtailPublisherId

  if (!publisherId) {
    throw new Error('Newtail publisher ID not found')
  }

  return publisherId
}
