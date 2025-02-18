import { NetworkId } from '@autonomys/auto-utils'
import { AnyRoutes, Routes, ROUTES } from 'constants/routes'
import { Route } from 'types/app'

const findRoute = (route: Routes): Route | undefined =>
  ROUTES.find((item) => item.name === route || item.alias?.includes(route))

const isRouteSupported = (currentNetwork: NetworkId, routeItem: Route): boolean =>
  !!currentNetwork &&
  !!routeItem &&
  (!routeItem.networks || routeItem.networks.includes(currentNetwork))

export const isRouteSupportingNetwork = (
  currentNetwork: NetworkId | undefined,
  route: Routes,
  childRoute?: AnyRoutes,
): boolean => {
  const routeFound = findRoute(route)
  if (!routeFound || !currentNetwork) return false

  if (childRoute && routeFound.children) {
    const child = routeFound.children.find((item) => item.name === childRoute)
    return child ? isRouteSupported(currentNetwork, child) : false
  }

  return isRouteSupported(currentNetwork, routeFound)
}

export const getSupportedHeaderLinks = (currentNetwork: NetworkId, route: string) => {
  const sectionChildren = ROUTES.find((item) => item.name === route)?.children
  return sectionChildren
    ? sectionChildren
        .filter((item) => !item.networks || item.networks?.includes(currentNetwork))
        .map((item) => ({
          title: item.title,
          link: `/${currentNetwork}/${item.name}`,
        }))
    : []
}
