import jsPDF from 'jspdf';

/**
 * Generates a PDF report based on the content of the 'AnalyticsReport' element.
 * The generated PDF is saved as 'sample.pdf'.
 */
const generatePDF = () => {
    const doc = new jsPDF();

    const htmlContent = document.getElementById('AnalyticsReport');

        // Options for the PDF layout
        const options = {
            x: 10,
            y: 10,
            width: 180,
        };

    console.log(htmlContent);



    doc.save('sample.pdf'); // Save the generated PDF
};


export default generatePDF;