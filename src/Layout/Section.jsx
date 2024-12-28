import { Outlet } from 'react-router-dom';

const Section = () => {
  return (
    <div className="content-section">
      <Outlet />
    </div>
  );
};

export default Section;
