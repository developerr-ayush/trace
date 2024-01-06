"use client"
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import DropDown from '../components/Dropdown';
import IssueList from '../components/IssueList';
import { useEffect, useState } from 'react';
import { getRequest } from '../FactoryFunction';
import { IssueType } from '../Interface';

const issueStatusList = ["All Issues", "Open", "In Progress", "Completed"];

const mapStatusToDB = ["ALL ISSUES", "OPEN", "IN_PROGRESS", "CLOSED"];

const Issues = () => {
  const [tableRow, setTableRow] = useState<IssueType | null>(null);
  const [filter, setFilter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getRequest("/api/issues");
        const filteredData = filter === 0 ? response : response.filter((item: any) => item.status === mapStatusToDB[filter]);
        setTableRow(filteredData);
      } catch (error) {
        setError("Error fetching issues: Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [filter]);

  return (
    <div>
      <div className="head flex flex-wrap justify-between items-center">
        <DropDown issueList={issueStatusList} filter={filter} setFilter={setFilter} />
        <Button>
          <Link href="/issues/new">New Issues</Link>
        </Button>
      </div>
      {isLoading ? (
        <div className="loading">Loading issues...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : tableRow ? (
        <IssueList rows={tableRow} />
      ) : (
        <div className="Error">No Data Found</div>
      )}
    </div>
  );
};

export default Issues;
