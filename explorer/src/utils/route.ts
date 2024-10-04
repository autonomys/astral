import { Route } from '@/types/app'
import { NetworkId } from '@autonomys/auto-utils'
import { ROUTES, Routes } from 'constants/routes'

const findRoute = (route: Routes): Route | undefined => ROUTES.find((item) => item.name === route)

const isRouteSupported = (currentNetwork: NetworkId, routeItem: Route): boolean =>
  !!currentNetwork &&
  !!routeItem &&
  (!routeItem.networks || routeItem.networks.includes(currentNetwork))

export const isRouteSupportingNetwork = (
  currentNetwork: NetworkId | undefined,
  route: Routes,
  childRoute?: Routes,
): boolean => {
  const routeFound = findRoute(route)
  if (!routeFound || !currentNetwork) return false

  if (childRoute && routeFound.children) {
    const child = routeFound.children.find((item) => item.name === childRoute)
    return child ? isRouteSupported(currentNetwork, child) : false
  }

  return isRouteSupported(currentNetwork, routeFound)
}
