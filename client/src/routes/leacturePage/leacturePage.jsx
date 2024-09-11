import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LectureDetails from '../../components/leactures/LectureDetails'; // O componente que criamos

const LecturePage = () => {
  const { id } = useParams(); // Esse "id" é o lectureId
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8800/lectures/${id}`);
        const data = await response.json();
        setLecture(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes da palestra:', error);
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!lecture) {
    return <p>Palestra não encontrada.</p>;
  }

  return (
    <LectureDetails
      title={lecture.title}
      description={lecture.description}
      speaker={lecture.speaker}
      date={lecture.date}
      location={lecture.location}
      enrolled={lecture.enrolled}
      capacity={lecture.capacity}
      lectureId={id} // Passando o ID da palestra como prop
    />
  );
};

export default LecturePage;
