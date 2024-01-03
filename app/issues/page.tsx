"use client"
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import DropDown from '../components/Dropdown'
import IssueList from '../components/IssueList'
import { useEffect, useState } from 'react'
import { getRequest } from '../FactoryFunction'
let issuelist = [
  "All Issues",
  "Open",
  "In Progress",
  "Completed",
]
let issuesDBList = [
  "ALL ISSUES",
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED"
]
const Issues = () => {
  const [tableRow, setTableRow] = useState(null)
  const [filter, setFilter] = useState(0)
  useEffect(() => {
    getRequest("/api/issues").then(res => {
      let data;
      if (issuesDBList[0] != issuesDBList[filter]) {
        data = res.filter((data: any) => data.status)
      }
      setTableRow(data)
    })
  }, [filter])
  return (
    <div>
      <div className="head flex flex-wrap justify-between items-center  ">
        <DropDown issueList={issuelist} filter={filter} setFilter={setFilter} />
        <Button>
          <Link href="/issues/new" >
            New Issues
          </Link>
        </Button>
      </div>
      {tableRow && <IssueList rows={tableRow} />}
    </div>
  )

}
export default Issues;