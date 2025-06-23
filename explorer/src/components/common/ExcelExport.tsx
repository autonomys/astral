import { FC } from 'react'

interface ExcelExportProps {
  data: Record<string, unknown>[]
  filename?: string
}

const ExcelExport: FC<ExcelExportProps> = ({ data, filename = 'export.xlsx' }) => {
  const exportToExcel = async () => {
    const XLSX = await import('xlsx')
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, filename)
  }

  return (
    <button onClick={exportToExcel} className='btn btn-primary'>
      Export to Excel
    </button>
  )
}

export default ExcelExport
