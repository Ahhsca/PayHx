export default function SubmitSalaryPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div>
            <p>Today's date: {currentDate}</p>
            <p>We will provide website updates here.</p>
        </div>
    );
  }