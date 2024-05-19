/* eslint-disable react/prop-types */


function PageContent({ title, children }) {
  return (
    <div className='mx-auto mt-4 text-center p-6'>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
