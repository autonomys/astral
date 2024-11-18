import { ArchivedHistoryIcon, BlockIcon, DocIcon, PieChartIcon, WalletIcon } from 'components/icons'
import { FC, useMemo } from 'react'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  blocksCount?: string
  extrinsicsCount?: string
  signedExtrinsicsCount?: string
  accountsCount?: string
  accountsWithBalanceCount?: string
  spacePledged?: string
  spacePledgedBinary?: string
  historySize?: string
  historySizeBinary?: string
}

export const HomeCards: FC<Props> = ({
  blocksCount = '0',
  extrinsicsCount = '0',
  signedExtrinsicsCount = '0',
  accountsCount = '0',
  accountsWithBalanceCount = '0',
  spacePledged = '0',
  spacePledgedBinary = '0',
  historySize = '0',
  historySizeBinary = '0',
}) => {
  const listOfCards = useMemo(
    () => [
      {
        title: 'Processed Blocks',
        icon: <BlockIcon />,
        value: blocksCount,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-pastelPurple dark:to-pastelBlue',
      },
      {
        title: 'Extrinsics',
        icon: <DocIcon />,
        value: extrinsicsCount,
        tooltip: <p className='whitespace-nowrap'>{signedExtrinsicsCount} signed</p>,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-purpleUndertone dark:to-pastelBlue',
      },
      {
        title: 'Wallet addresses',
        icon: <WalletIcon />,
        value: accountsCount,
        tooltip: <p className='whitespace-nowrap'>{accountsWithBalanceCount} &gt;= 1</p>,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-pastelPurple dark:to-pastelPink',
      },
      {
        title: 'Total Space Pledged',
        icon: <PieChartIcon />,
        value: spacePledged,
        tooltip: spacePledgedBinary,
        darkBgClass:
          'dark:bg-gradient-to-b dark:from-purpleLighterAccent dark:via-purpleShade dark:to-pastelPurple',
      },
      {
        title: 'Archived History Size',
        icon: <ArchivedHistoryIcon />,
        value: historySize,
        tooltip: historySizeBinary,
        darkBgClass: 'dark:bg-gradient-to-b dark:from-pastelBlue dark:to-pastelPink',
      },
    ],
    [
      blocksCount,
      historySize,
      accountsCount,
      extrinsicsCount,
      signedExtrinsicsCount,
      accountsWithBalanceCount,
      spacePledged,
      spacePledgedBinary,
      historySizeBinary,
    ],
  )

  return (
    <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
      {listOfCards.map(({ title, value, icon, tooltip, darkBgClass }, index) => (
        <HomeInfoCard
          key={`${title}-${index}`}
          title={title}
          value={value}
          icon={icon}
          tooltip={tooltip}
          darkBgClass={darkBgClass}
        />
      ))}
    </div>
  )
}
