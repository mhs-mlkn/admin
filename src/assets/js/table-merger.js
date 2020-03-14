import $ from "jquery-lite";
/**
 * @summary     table-merger.js => API used to merge cells of a certain member class
 * @description table_merger method. Dependent of jQuery library, can be used
 *              on any HTML table object to merge cells (td).
 * @version     0.0 / (requires jQuery)
 * @file        table-merger.js
 * @author      Tiago Câmara
 * @copyright   N/A
 *
 */

//PARAMS: required string table_id (e.g. "#table");
//        optional string merge_cell_class (e.g. "merge_cells");
export default function table_merger(table_id, merge_cell_class) {
  //Configuration
  //cell class to be merged
  const cell_class =
    merge_cell_class === undefined ? "selected" : merge_cell_class;

  if (table_id === undefined) console.error("bad input");

  //merge selected cells
  merge(table_id, cell_class);

  //merge cells
  function merge(table_id, cell_class) {
    var table_div = table_id;
    var hasMerged = true;

    while (hasMerged) {
      hasMerged = false;

      if ($(table_div).find("." + cell_class).length < 2) return;

      //ROWS
      //try to merge cells (horizontally)
      var table_rows = $(table_div).find("tr");

      for (var i = 0; i < table_rows.length; i++) {
        var selected_cells_row = $(table_rows[i]).find("." + cell_class);

        if (selected_cells_row.length < 2)
          //less than two cells to merge
          continue;

        //CELLS
        for (var j = 0; j < selected_cells_row.length; j++) {
          if (j >= selected_cells_row.length - 1)
            //last cell
            break;

          var current_cell = selected_cells_row[j];
          var next_cell = selected_cells_row[j + 1];

          //check adjacency
          if (
            current_cell.cellIndex + current_cell.colSpan !==
            next_cell.cellIndex
          )
            continue; //if false continue

          //check size
          if (current_cell.rowSpan !== next_cell.rowSpan) continue;

          //merge
          $(current_cell).attr(
            "colSpan",
            current_cell.colSpan + next_cell.colSpan
          );
          $(next_cell).removeClass(cell_class);
          $(next_cell).addClass("hidden");

          //update
          hasMerged = true;
          selected_cells_row = $(table_rows[i]).find("." + cell_class);
        }
      }

      //COLUMNS
      //try to merge cells (vertically)
      var selected_cells = $(table_div).find("." + cell_class);

      if (selected_cells.length < 2)
        //no cells two merge
        return;

      for (let i = 0; i < selected_cells.length; i++) {
        if (i >= selected_cells.length - 1)
          //last cell
          break;

        let current_cell = selected_cells[i];

        //next cell
        var cells = $(current_cell.parentElement).nextAll()[
          current_cell.rowSpan - 1
        ];

        if (!cells) continue;

        let next_cell = cells.children[current_cell.cellIndex];

        if (!next_cell)
          //no next_cell
          continue;

        //check adjacency
        if (!$(next_cell).hasClass(cell_class)) continue;

        //check size
        if (current_cell.colSpan !== next_cell.colSpan) continue;

        //merge
        $(current_cell).attr(
          "rowSpan",
          current_cell.rowSpan + next_cell.rowSpan
        );
        $(next_cell).removeClass(cell_class);
        $(next_cell).addClass("hidden");

        //update
        hasMerged = true;
        selected_cells = $(table_div).find("." + cell_class);
      }
    }
  }
}
