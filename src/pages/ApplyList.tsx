import Layout from '@/components/layout/Layout';
import styled from 'styled-components';
import iconTrash from '@/assets/images/icon-trash.svg';
import { useEffect, useState } from 'react';
import { onValue, ref, remove } from 'firebase/database';
import { db, auth } from '@/firebase';
import Pagination from '@/components/Pagination';
import { Application } from '@/lib/types/application';
import { useUserNameStore } from '@/lib/store/useUserNameStore';
import { device } from '@/styles/media';

const ApplyList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const userId = auth.currentUser?.uid;
  const { userName } = useUserNameStore();

  useEffect(() => {
    if (!userId) return;

    const applicationsRef = ref(db, `applyForm/${userId}`);
    const unsubscribe = onValue(applicationsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const applicationList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })) as Application[];
        setApplications(applicationList.reverse());
      } else {
        setApplications([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const handleDelete = async (id: string) => {
    try {
      await remove(ref(db, `applyForm/${userId}/${id}`));
    } catch (error) {
      console.error('Error deleting data from Firebase Database:', error);
      alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const getTrainerColor = (trainer: string) => {
    switch (trainer) {
      case '박민주 T':
        return { backgroundColor: 'var(--chip-green-bg)', color: 'var(--chip-green)' };
      case '유현욱 T':
        return { backgroundColor: 'var(--chip-red-bg)', color: 'var(--chip-red)' };
      case '이동희 T':
        return { backgroundColor: 'var(--chip-yellow-bg)', color: 'var(--chip-yellow)' };
      case '정보현 T':
        return { backgroundColor: 'var(--chip-blue-bg)', color: 'var(--chip-blue)' };
      default:
        return {};
    }
  };

  const lastApplication = currentPage * itemsPerPage;
  const firstApplication = lastApplication - itemsPerPage;
  const currentApplications = applications.slice(firstApplication, lastApplication);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <TitleLayout>PT 신청 내역</TitleLayout>
      <TableContainer>
        <TableLayout>
          <TheadLayout>
            <tr>
              <th>닉네임</th>
              <th>PT 시작 날짜</th>
              <th>퍼스널 트레이너</th>
              <th>횟수</th>
              <th>비용</th>
              <th></th>
            </tr>
          </TheadLayout>
          <TbodyLayout>
            {currentApplications.length > 0 ? (
              currentApplications.map((application) => (
                <tr key={application.id}>
                  <td>{userName}</td>
                  <td>{application.startDate}</td>
                  <td>
                    <TrainerText style={getTrainerColor(application.trainer)}>{application.trainer}</TrainerText>
                  </td>
                  <td>{application.count}</td>
                  <td>{application.cost}</td>
                  <td>
                    <DeleteBtn onClick={() => handleDelete(application.id)}>
                      <DeleteImg src={iconTrash} alt="휴지통 이미지" />
                    </DeleteBtn>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyRow>
                <td colSpan={6}>신청 내역이 없습니다.</td>
              </EmptyRow>
            )}
          </TbodyLayout>
        </TableLayout>
      </TableContainer>
      {applications.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={applications.length}
          paginate={paginate}
        />
      )}
    </Layout>
  );
};

const TitleLayout = styled.h2`
  margin-bottom: 5rem;
  font-size: 2.8rem;
  font-weight: 700;

  @media ${device.tablet} {
    margin-bottom: 3rem;
    font-size: 2.6rem;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
`;

const TableLayout = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TheadLayout = styled.thead`
  th {
    width: 15%;
    padding: 2.4rem 1.4rem;
    color: var(--color-gray-dark);
    border-bottom: var(--border-primary);

    &:last-child {
      width: 10%;
    }
  }
`;

const TbodyLayout = styled.tbody`
  tr {
    border-bottom: var(--border-gray);

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    text-align: center;
    padding: 2.4rem 1.4rem;
    font-weight: 500;
  }
`;

const TrainerText = styled.span`
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 5rem;
`;

const DeleteBtn = styled.button`
  width: 100%;
`;

const DeleteImg = styled.img`
  width: 2rem;
`;

const EmptyRow = styled.tr`
  td {
    padding: 16rem 0;
  }
`;

export default ApplyList;
