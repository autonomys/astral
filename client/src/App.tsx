import { Routes, Route, BrowserRouter } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

// block
import { Block, BlockList } from 'Block/components'

// extrinsic
import { Extrinsic, ExtrinsicList } from 'Extrinsic/components'

// layout
import { NotFound } from 'layout/components'
import NotResultsFound from 'layout/components/NotResultsFound'
import SearchResult from 'layout/components/SearchResult'

// home
import Home from 'Home'

// account
import { AccountList, Account, AccountRewardList } from 'Account/components'

// event
import { Event, EventList } from 'Event/components'

// log
import { Log, LogList } from 'Log/components'

// operator
import Operator from 'Operator/components/Operator'
import OperatorsList from 'Operator/components/OperatorsList'

// leaderboard
import LeaderboardLayout from 'layout/components/LeaderboardLayout'
import VoteBlockRewardList from 'Leaderboard/components/VoteBlockRewardList'
import NominatorRewardsList from 'Leaderboard/components/NominatorRewardsList'
import OperatorRewardsList from 'Leaderboard/components/OperatorRewardsList'
import DomainLayout from 'layout/components/DomainLayout'
import { Fragment } from 'react'

// force page scroll to top on route change
// function ScrollToTopWrapper({ children }) {
//   const location = useLocation()
//   useLayoutEffect(() => {
//     document.documentElement.scrollTo(0, 0)
//   }, [location.pathname])
//   return children
// }

// type Props = {
//   children: ReactNode
// }

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
      <Route path={INTERNAL_ROUTES.operators.list}>
        <Route index element={<OperatorsList />} />
        <Route path={INTERNAL_ROUTES.operators.id.path} element={<Operator />} />
      </Route>
      <Route path={INTERNAL_ROUTES.search.result.path}>
        <Route index element={<SearchResult />} />
      </Route>
    </>
  )
}

// const UpdateSelectedChainByPath = ({ children }: Props) => {
//   const { setSelectedChain, selectedChain, chains } = useDomains()

//   const location = useLocation()

//   useEffect(() => {
//     const regex = new RegExp('^/([^/]+)')

//     const match = location.pathname.match(regex)

//     if (match && match[1] !== selectedChain.urls.page) {
//       const urlSelectedPage = match[1]
//       const newChain = chains.find((chain) => chain.urls.page === urlSelectedPage)

//       if (newChain) {
//         setSelectedChain(newChain)
//       }
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname])

//   return <>{children}</>
// }

const App = () => {
  const { chains } = useDomains()

  const networks = chains.map((chain) => chain.urls.page)

  return (
    <BrowserRouter>
      <Routes>
        {networks.map((network, index) => (
          <Fragment key={`${network}-${index}`}>
            <Route path={`/${network}/evm`} element={<DomainLayout />}>
              {createDomainRoutes()}
            </Route>
            <Route path={`/${network}/consensus`} element={<DomainLayout />}>
              {createDomainRoutes()}
            </Route>
            <Route path={`/${network}/leaderboard`} element={<LeaderboardLayout />}>
              <Route index element={<VoteBlockRewardList />} />
              <Route path='farmers' element={<VoteBlockRewardList />} />
              <Route path='nominators' element={<NominatorRewardsList />} />
              <Route path='operators' element={<OperatorRewardsList />} />
            </Route>
          </Fragment>
        ))}
        <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
        <Route element={<NotResultsFound />} path={INTERNAL_ROUTES.search.empty} />
      </Routes>
    </BrowserRouter>
  )
}

// function App() {
//   const { selectedChain } = useDomains()

//   return (
//     <HashRouter>
//       <ScrollToTopWrapper>
//         <Layout>
//           <DomainHeader />
//           <UpdateSelectedChainByPath>
//             <Header />
//             <ErrorBoundary
//               fallbackRender={ErrorFallback}
//               onReset={() => window.location.reload()}
//               // TODO: consider adding error monitoring
//               onError={(error) => console.error(error)}
//             >
//               <Container>
//                 <HeaderBackground />
//                 <Routes>
//                   <Route
//                     path={INTERNAL_ROUTES.home}
//                     element={<Navigate to={selectedChain.urls.page} />}
//                   />
//                   <Route path={INTERNAL_ROUTES.leaderboard.farmers} element={<Leaderboard />} />
//                   <Route path={':network'}>
//                     <Route index element={<Home />} />
//                     <Route path={INTERNAL_ROUTES.blocks.list}>
//                       <Route index element={<BlockList />} />
//                       <Route element={<Block />} path={INTERNAL_ROUTES.blocks.id.path} />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.extrinsics.list}>
//                       <Route index element={<ExtrinsicList />} />
//                       <Route path={INTERNAL_ROUTES.extrinsics.id.path} element={<Extrinsic />} />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.accounts.list}>
//                       <Route index element={<AccountList />} />
//                       <Route path={INTERNAL_ROUTES.accounts.id.path} element={<Account />} />
//                       <Route
//                         path={INTERNAL_ROUTES.accounts.rewards.path}
//                         element={<AccountRewardList />}
//                       />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.events.list}>
//                       <Route index element={<EventList />} />
//                       <Route path={INTERNAL_ROUTES.events.id.path} element={<Event />} />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.logs.list}>
//                       <Route index element={<LogList />} />
//                       <Route path={INTERNAL_ROUTES.logs.id.path} element={<Log />} />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.operators.list}>
//                       <Route index element={<OperatorsList />} />
//                       <Route path={INTERNAL_ROUTES.operators.id.path} element={<Operator />} />
//                     </Route>
//                     <Route path={INTERNAL_ROUTES.search.result.path}>
//                       <Route index element={<SearchResult />} />
//                     </Route>
//                   </Route>

//                   <Route element={<NotFound />} path={INTERNAL_ROUTES.notFound} />
//                   <Route element={<NotResultsFound />} path={INTERNAL_ROUTES.search.empty} />
//                 </Routes>
//               </Container>
//             </ErrorBoundary>
//           </UpdateSelectedChainByPath>
//           <Footer />
//           <Toaster />
//         </Layout>
//       </ScrollToTopWrapper>
//     </HashRouter>
//   )
// }

export default App
