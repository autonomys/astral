import ReactGA from 'react-ga4'

const initializeGA = () => {
  if (!process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
    throw new Error('REACT_APP_GOOGLE_ANALYTICS_ID is not set')
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
}

const trackGAEvent = (category: string, action: string, label: string) => {
  console.log('GA event:', category, ':', action, ':', label)
  // Send GA4 Event
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

export default initializeGA
export { initializeGA, trackGAEvent }
