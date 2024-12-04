import { Arguments } from '@/components/common/Arguments'
import useIndexers from '@/hooks/useIndexers'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FileByIdQuery } from 'gql/graphql'
import Image from 'next/image'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
  file: NonNullable<FileByIdQuery['files_files'][number]>
  isDesktop?: boolean
}

export const FileDetailsTab: FC<Props> = ({ file, isDesktop = false }) => {
  const { network } = useIndexers()
  const [data, setData] = useState<object | null>(null)

  const cidUrl = useMemo(() => `/api/cid/${network}/${file.id}`, [network, file.id])

  const fetchData = useCallback(async () => {
    if (file.name?.endsWith('.json')) {
      const json = await fetch(cidUrl).then((res) => res.json())
      setData(json)
    }
  }, [cidUrl, file.name])

  const preview = useMemo(() => {
    switch (true) {
      case file.name?.endsWith('.png'):
      case file.name?.endsWith('.jpg'):
      case file.name?.endsWith('.jpeg'):
      case file.name?.endsWith('.gif'):
        return (
          <Image
            src={cidUrl}
            alt='File Preview'
            width={520}
            height={520}
            style={{ width: '50%', height: 'auto' }}
          />
        )
      case file.name?.endsWith('.pdf'):
      case file.name?.endsWith('.ai'):
        return (
          <object data={cidUrl} type='application/pdf' width='100%' height='800px'>
            <p>
              Alternative text - include a link <a href={cidUrl}>to the PDF!</a>
            </p>
          </object>
        )
      case file.name?.endsWith('.json') && data !== null:
        return (
          <div className='mb-4 w-full break-all rounded-lg border border-purpleLight bg-purpleLight p-4 shadow dark:border-none dark:bg-white/10'>
            <Arguments args={data} />
          </div>
        )
      default:
        return <div>No preview available</div>
    }
  }, [file.name, cidUrl, data])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title='File Preview'>
        <div className='flex justify-center'>{preview}</div>
      </Tab>
    </PageTabs>
  )
}
