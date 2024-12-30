import * as xlsx from 'xlsx';

export const csvToJson = (file, quizId) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                // Read the binary string from the file
                const binaryString = e.target.result;

                // Parse the binary string into a workbook
                const workbook = xlsx.read(binaryString, { type: 'binary' });

                // Get the first sheet and convert it to JSON
                const sheetName = workbook.SheetNames[0];
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                // Format the data
                const formattedData = jsonData.map((row) => ({
                    quizId,
                    question: row['Question'],
                    marks: row['marks'],
                    negative: row['negative'] || 0,
                    category: "MCQ",
                    options: [
                        { text: row['option1'], isCorrect: true },
                        { text: row['option2'], isCorrect: false },
                        { text: row['option3'], isCorrect: false },
                        { text: row['option4'], isCorrect: false },
                    ],
                }));

                // Resolve the promise with the formatted data
                resolve(formattedData);
            } catch (error) {
                // Reject the promise if there's an error
                reject(error);
            }
        };

        reader.onerror = (error) => {
            // Reject if there's an error while reading the file
            reject(error);
        };

        // Read the file as a binary string
        reader.readAsBinaryString(file);
    });
};
