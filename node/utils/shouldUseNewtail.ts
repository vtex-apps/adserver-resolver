export const shouldUseNewtail = async (ctx: Context) => {
  const settings = await ctx.clients.apps.getAppSettings(
    'vtex.adserver-resolver'
  )

  return settings?.enableNewtail ?? false
}
