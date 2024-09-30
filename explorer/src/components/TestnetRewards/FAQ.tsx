'use client'

import { FC, useState } from 'react'

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='mt-8 w-full max-w-xl'>
      <h2 className='text-center text-xl font-bold text-gray-900 dark:text-white '>FAQ</h2>
      <div className='mt-4'>
        {[
          {
            question: 'How will testnet rewards be distributed?',
            answer:
              'Testnet rewards will be minted into the genesis block of the Autonomys Network Mainnet.\n\nThis will happen at the launch of Phase-1, and testnet farmers will be able to query the balances of their wallets immediately.',
          },
          {
            question: 'What are the phases of the mainnet launch?',
            answer:
              'What has been referred to previously as Mainnet Beta will be deployed in two distinct phases.\n\n- Phase-1 will launch the consensus chain.\nThis allows us to establish the farmer network and secure the PoAS consensus with a healthy amount of space pledged. Consensus chain token transfers will be disabled at the protocol level in Phase-1.\n\n- Phase-2 will introduce our decoupled execution environments which are known as domains. Consensus chain token transfers will be enabled.',
          },
          {
            question: 'What can I do with my mainnet rewards?',
            answer:
              'During Mainnet Phase-1 it will be possible to use them as gas to submit transactions on the consensus chain.\n\nFor example a testnet farmer could pay to store data on-chain using the system.remark extrinsic.\nThings get exciting at Phase-2 as token holders will be able to transfer them, convert them to domain tokens using XDM (Cross Domain Messaging) and stake them to run an operator and earn transaction fees.\n\nIf the commitment of running operator infrastructure is not practical, it is also possible to nominate operators to receive a share of the transaction fees being earned by the operators. Transferring consensus tokens to a domain opens up the possibilities afforded by the ecosystem of dApps that live and operate within them.',
          },
        ].map((question, index) => (
          <div key={index} className='m-4'>
            <button
              className='w-full rounded-lg bg-white p-8 text-left text-gray-900 shadow-md  dark:border-none dark:bg-gray-800 dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo dark:text-white'
              onClick={() => toggleFAQ(index)}
            >
              <span className='font-semibold'>
                {index + 1}. {question.question}
              </span>
              <span className='float-right'>{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div className='mt-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-700'>
                <p className='whitespace-pre-line text-gray-700 dark:text-white'>
                  {question.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
