import { Fragment, ReactNode, useEffect, useMemo } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

// common
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

// block
import { Block, BlockList } from 'Block/components'

// extrinsic
import { Extrinsic, ExtrinsicList } from 'Extrinsic/components'

// layout
import { NotFound } from 'layout/components'
import DomainLayout from 'layout/components/DomainLayout'
import LeaderboardLayout from 'layout/components/LeaderboardLayout'
import NotResultsFound from 'layout/components/NotResultsFound'
import OperatorLayout from 'layout/components/OperatorLayout'
import SearchResult from 'layout/components/SearchResult'

// home
import Home from 'Home'

// account
import { Account, AccountList, AccountRewardList } from 'Account/components'

// event
import { Event, EventList } from 'Event/components'

// log
import { Log, LogList } from 'Log/components'

// operator
import OperatorManagement from 'Operator/components/OperatorManagement'
import OperatorNominate from 'Operator/components/OperatorNominate'
import OperatorStake from 'Operator/components/OperatorStake'
import OperatorsList from 'Operator/components/OperatorsList'

// leaderboard
import NominatorRewardsList from 'Leaderboard/components/NominatorRewardsList'
import OperatorRewardsList from 'Leaderboard/components/OperatorRewardsList'
import VoteBlockRewardList from 'Leaderboard/components/VoteBlockRewardList'
import { Toaster } from 'react-hot-toast'

const createDomainRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path={INTERNAL_ROUTES.blocks.list}>
        <Route index element={<BlockList />} />
        <Route element={<Block />} path={INTERNAL_ROUTES.blocks.id.path} />
      </Route>
      <Route path={INTERNAL_ROUTES.extrinsics.list}>
        <Route index element={<ExtrinsicList />} />
        <Route path={INTERNAL_ROUTES.extrinsics.id.path} element={<Extrinsic />} />
      </Route>
      <Route path={INTERNAL_ROUTES.accounts.list}>
        <Route index element={<AccountList />} />
        <Route path={INTERNAL_ROUTES.accounts.id.path} element={<Account />} />
        <Route path={INTERNAL_ROUTES.accounts.rewards.path} element={<AccountRewardList />} />
      </Route>
      <Route path={INTERNAL_ROUTES.events.list}>
        <Route index element={<EventList />} />
        <Route path={INTERNAL_ROUTES.events.id.path} element={<Event />} />
      </Route>
      <Route path={INTERNAL_ROUTES.logs.list}>
        <Route index element={<LogList />} />
        <Route path={INTERNAL_ROUTES.logs.id.path} element={<Log />} />
      </Route>
      <Route path={INTERNAL_ROUTES.search.result.path}>
        <Route index element={<SearchResult />} />
      </Route>
    </>
  )
}

type Props = {
  children: ReactNode
}

const UpdateSelectedChainByPath = ({ children }: Props) => {
  const { setSelectedChain, setSelectedDomain, selectedChain, selectedDomain, chains } =
    useDomains()

  const location = useLocation()

  useEffect(() => {
    const regex = new RegExp('^/([^/]+)/([^/]+)')

    const match = location.pathname.match(regex)

    if (match && match[2] !== selectedDomain) setSelectedDomain(match[2])

    if (match && match[1] !== selectedChain.urls.page) {
      const urlSelectedPage = match[1]

      const newChain = chains.find((chain) => chain.urls.page === urlSelectedPage)
      if (newChain) setSelectedChain(newChain)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return <>{children}</>
}

const App = () => {
  const { chains, selectedChain, selectedDomain } = useDomains()
  const networks = useMemo(() => chains.map((chain) => chain.urls.page), [chains])

  return (
    <HashRouter>
      <UpdateSelectedChainByPath>
        <Routes>
          <Route
            path={INTERNAL_ROUTES.home}
            element={<Navigate to={`${selectedChain.urls.page}/${selectedDomain}`} />}
          />
          {networks.map((network, index) => (
            <Fragment key={`${network}-${index}`}>
              <Route path={`/${network}/evm`} element={<DomainLayout />}>
                {createDomainRoutes()}
              </Route>
              <Route path={`/${network}/consensus`} element={<DomainLayout />}>
                {createDomainRoutes()}
              </Route>
              <Route path={`/${network}`} element={<DomainLayout />}>
                {createDomainRoutes()}
              </Route>
              <Route path={`/${network}/leaderboard`} element={<LeaderboardLayout />}>
                <Route index element={<VoteBlockRewardList />} />
                <Route
                  path={INTERNAL_ROUTES.leaderboard.farmers}
                  element={<VoteBlockRewardList />}
                />
                <Route
                  path={INTERNAL_ROUTES.leaderboard.operators}
                  element={<NominatorRewardsList />}
                />
                <Route
                  path={INTERNAL_ROUTES.leaderboard.nominators}
                  element={<OperatorRewardsList />}
                />
              </Route>
              <Route path={`/${network}/operators`} element={<OperatorLayout />}>
                <Route index element={<OperatorsList />} />
                <Route path={INTERNAL_ROUTES.operators.id.path} element={<OperatorsList />} />
                <Route path={INTERNAL_ROUTES.operators.list} element={<OperatorsList />} />
                <Route path={INTERNAL_ROUTES.operators.stake} element={<OperatorStake />} />
                <Route path={INTERNAL_ROUTES.operators.manage} element={<OperatorManagement />} />
                <Route path={INTERNAL_ROUTES.operators.nominate} element={<OperatorNominate />} />
              </Route>
            </Fragment>
          ))}
          <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
          <Route element={<NotResultsFound />} path={INTERNAL_ROUTES.search.empty} />
          <Route element={<NotFound />} path={INTERNAL_ROUTES.catchAll} />
        </Routes>
      </UpdateSelectedChainByPath>
      <Toaster />
    </HashRouter>
  )
}

export default App
