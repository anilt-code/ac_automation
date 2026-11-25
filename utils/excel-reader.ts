import ExcelJS from 'exceljs';

// This interface explains what data one row from Excel contains.
export interface LoginTestData {
  testName: string;
  email: string;
  password: string;
  otp: string;
  expectedResult: 'success' | 'invalidCredentials' | 'invalidOtp';
}

// This function reads login data from an Excel file.
export async function readLoginTestData(filePath: string): Promise<LoginTestData[]> {
  // Create an Excel workbook reader.
  const workbook = new ExcelJS.Workbook();

  // Open the Excel file from the location passed by the test.
  await workbook.xlsx.readFile(filePath);

  // Read the first sheet in the workbook.
  const firstSheet = workbook.worksheets[0];

  if (!firstSheet) {
    throw new Error('The login Excel file does not contain a worksheet.');
  }

  const loginRows: LoginTestData[] = [];

  // Excel row 1 is the heading row, so reading starts from row 2.
  firstSheet.eachRow((excelRow, rowNumber) => {
    if (rowNumber === 1) {
      return;
    }

    // Column 1 = testName
    const testName = String(excelRow.getCell(1).value ?? '').trim();

    // Ignore completely empty rows.
    if (!testName) {
      return;
    }

    // Columns in the Excel file:
    // 1: testName
    // 2: email
    // 3: password
    // 4: otp
    // 5: expectedResult
    loginRows.push({
      testName,
      email: String(excelRow.getCell(2).value ?? '').trim(),
      password: String(excelRow.getCell(3).value ?? '').trim(),
      otp: String(excelRow.getCell(4).value ?? '').trim(),
      expectedResult: String(excelRow.getCell(5).value ?? '').trim() as LoginTestData['expectedResult'],
    });
  });

  return loginRows;
}
