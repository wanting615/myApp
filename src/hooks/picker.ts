import { pickerController, } from "@ionic/vue";

type ColumnOptions = Array<string[]>;

interface Options {
  cssClass?: string;
  title?: string;
  OkBtn?: boolean;
  cancleBtn?: boolean;
}

interface PickData {
  "col-0": Col;
  "col-1": Col;
  "col-2": Col;
}
interface Col {
  text: string;
  value: number;
  columnIndex: number;
}

export async function openPicker(numColumns = 1, numOptions = 5, columnOptions: ColumnOptions, options?: Options) {
  const picker = await pickerController.create({
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    columns: getColumns(numColumns, numOptions, columnOptions),
    cssClass: options && options.cssClass ? options.cssClass : 'picker',
    buttons: [
      {
        text: options && options.cancleBtn ? "取消" : '',
        role: 'cancel',
        handler: () => { return false }
      },
      {
        text: options?.title,
        handler: () => { return false }
      },
      {
        text: options && options.OkBtn === false ? "" : '确认',
      }
    ]
  });
  await picker.present();
  const data = await picker.onDidDismiss<PickData>();
  return data;
}

function getColumns(numColumns: number, numOptions: number, columnOptions: ColumnOptions) {
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push({
      name: `col-${i}`,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      options: getColumnOptions(i, numOptions, columnOptions)
    });
  }

  return columns;
}

function getColumnOptions(columnIndex: number, numOptions: number, columnOptions: ColumnOptions) {
  const options = [];
  for (let i = 0; i < numOptions; i++) {
    options.push({
      text: columnOptions[columnIndex][i % numOptions],
      value: i
    })
  }

  return options;
}