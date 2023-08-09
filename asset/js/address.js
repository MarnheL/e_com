/*DROPDOWN ADDRESS*/

function createProvince(name, id) {
  return {
    name: name,
    id: id,
  };
}

function createCity(name, id, province) {
  return {
    name: name,
    id: id,
    province: province,
  };
}

function createBarangay(name, id, city) {
  return {
    name: name,
    id: id,
    city: city,
  };
}

function removeOptions(select) {
  while (select.options.length > 1) {                
    select.remove(1);
  }
  
  select.value = "";
}


function addOptions(select, options) {
  console.log(select, options)
  options.forEach(function(option) {
    select.options.add(new Option(option.name, option.id));
  });
}


var provincesSelect = document.getElementById('provinces-select');
var citiesSelect = document.getElementById('cities-select');
var barangaysSelect = document.getElementById('barangays-select');

/*----------------PROVINCE----------------*/
var provinces = [
  createProvince('Cavite', 'Cavite')
];

/*--------------LIST OF CITIES IN CAVITE--------------*/
var cities = [
  createCity('Alfonso', 'Alfonso', 'Cavite'),/** DONE */
  createCity('Amadeo', 'Amadeo', 'Cavite'),/** DONE */
  createCity('Bacoor', 'Bacoor', 'Cavite'),/** DONE */
  createCity('Carmona', 'Carmona', 'Cavite'),/** DONE */
  createCity('Cavite City', 'Cavite City', 'Cavite'),/** DONE */
  createCity('Dasmarinas', 'Dasmarinas', 'Cavite'),/** DONE */
  createCity('General Mariano Alvarez', 'General Mariano Alvarez', 'Cavite'),/** DONE */
  createCity('General Emilio Aguinaldo', 'General Emilio Aguinaldo', 'Cavite'),/** DONE */
  createCity('General Trias', 'General Trias', 'Cavite'),/** DONE */
  createCity('Imus', 'Imus', 'Cavite'),/** DONE */
  createCity('Indang', 'Indang', 'Cavite'),/** DONE */
  createCity('Kawit', 'Kawit', 'Cavite'),/** DONE */
  createCity('Magallanes', 'Magallanes', 'Cavite'),/** DONE */
  createCity('Maragondon', 'Maragondon', 'Cavite'),/** DONE */
  createCity('Mendez', 'Mendez', 'Cavite'),/** DONE */
  createCity('Naic', 'Naic', 'Cavite'),/** DONE */
  createCity('Noveleta', 'Noveleta', 'Cavite'),/** DONE */
  createCity('Rosario', 'Rosario', 'Cavite'),/** DONE */
  createCity('Silang', 'Silang', 'Cavite'),/** DONE */
  createCity('Tagaytay', 'Tagaytay', 'Cavite'),/** DONE */
  createCity('Tanza', 'Tanza', 'Cavite'),/** DONE */
  createCity('Ternate', 'Ternate', 'Cavite'),/** DONE */
  createCity('Trece Martires', 'Trece Martires', 'Cavite'),/** DONE */




 
 
 
 
];

/*--------------LIST  OF BARANGAYS PER CITY------------*/
var barangays = [
/* CAVITE CITY */
  createBarangay('Barangay 1', 'Barangay 1', 'Cavite City'),
  createBarangay('Barangay 10', 'Barangay 10', 'Cavite City'),
  createBarangay('Barangay 10-A', 'Barangay 10-A', 'Cavite City'),
  createBarangay('Barangay 11', 'Barangay 11', 'Cavite City'),
  createBarangay('Barangay 12', 'Barangay 12', 'Cavite City'),
  createBarangay('Barangay 13', 'Barangay 13', 'Cavite City'),
  createBarangay('Barangay 14', 'Barangay 14', 'Cavite City'),
  createBarangay('Barangay 15', 'Barangay 15', 'Cavite City'),
  createBarangay('Barangay 16', 'Barangay 16', 'Cavite City'),
  createBarangay('Barangay 17', 'Barangay 17', 'Cavite City'),
  createBarangay('Barangay 18', 'Barangay 18', 'Cavite City'),
  createBarangay('Barangay 19', 'Barangay 19', 'Cavite City'),
  createBarangay('Barangay 2', 'Barangay 2', 'Cavite City'),
  createBarangay('Barangay 20', 'Barangay 20', 'Cavite City'),
  createBarangay('Barangay 21', 'Barangay 21', 'Cavite City'),
  createBarangay('Barangay 22', 'Barangay 22', 'Cavite City'),
  createBarangay('Barangay 22-A', 'Barangay 22-A', 'Cavite City'),
  createBarangay('Barangay 23', 'Barangay 23', 'Cavite City'),
  createBarangay('Barangay 24', 'Barangay 24', 'Cavite City'),
  createBarangay('Barangay 25', 'b25', 'Cavite City'),
  createBarangay('Barangay 26', 'Barangay 26', 'Cavite City'),
  createBarangay('Barangay 27', 'b27', 'Cavite City'),
  createBarangay('Barangay 28', 'Barangay 28', 'Cavite City'),
  createBarangay('Barangay 29', 'Barangay 29', 'Cavite City'),
  createBarangay('Barangay 29-A', 'Barangay 29-A', 'Cavite City'),
  createBarangay('Barangay 3', 'Barangay 3', 'Cavite City'),
  createBarangay('Barangay 30', 'Barangay 30', 'Cavite City'),
  createBarangay('Barangay 31', 'Barangay 31', 'Cavite City'),
  createBarangay('Barangay 32', 'Barangay 32', 'Cavite City'),
  createBarangay('Barangay 33', 'Barangay 33', 'Cavite City'),
  createBarangay('Barangay 34', 'Barangay 34', 'Cavite City'),
  createBarangay('Barangay 35', 'Barangay 35', 'Cavite City'),
  createBarangay('Barangay 36', 'Barangay 36', 'Cavite City'),
  createBarangay('Barangay 36-A', 'Barangay 36-A', 'Cavite City'),
  createBarangay('Barangay 37', 'Barangay 37', 'Cavite City'),
  createBarangay('Barangay 37-A', 'Barangay 37-A', 'Cavite City'),
  createBarangay('Barangay 38', 'Barangay 38', 'Cavite City'),
  createBarangay('Barangay 38-A', 'Barangay 38-A', 'Cavite City'),
  createBarangay('Barangay 39', 'Barangay 39', 'Cavite City'),
  createBarangay('Barangay 4', 'Barangay 4', 'Cavite City'),
  createBarangay('Barangay 40', 'Barangay 40', 'Cavite City'),
  createBarangay('Barangay 41', 'Barangay 41', 'Cavite City'),
  createBarangay('Barangay 42', 'Barangay 42', 'Cavite City'),
  createBarangay('Barangay 42-A', 'Barangay 42-A', 'Cavite City'),
  createBarangay('Barangay 42-B', 'Barangay 42-B', 'Cavite City'),
  createBarangay('Barangay 42-C', 'Barangay 42-C', 'Cavite City'),
  createBarangay('Barangay 43', 'Barangay 43', 'Cavite City'),
  createBarangay('Barangay 44', 'Barangay 44', 'Cavite City'),
  createBarangay('Barangay 45', 'Barangay 45', 'Cavite City'),
  createBarangay('Barangay 45-A', 'Barangay 45-A', 'Cavite City'),
  createBarangay('Barangay 46', 'Barangay 46', 'Cavite City'),
  createBarangay('Barangay 47', 'Barangay 47', 'Cavite City'),
  createBarangay('Barangay 47-A', 'Barangay 47-A', 'Cavite City'),
  createBarangay('Barangay 47-B', 'Barangay 47-B', 'Cavite City'),
  createBarangay('Barangay 48', 'Barangay 48', 'Cavite City'),
  createBarangay('Barangay 48-A', 'Barangay 48-A', 'Cavite City'),
  createBarangay('Barangay 49', 'Barangay 49', 'Cavite City'),
  createBarangay('Barangay 49-A', 'Barangay 49-A', 'Cavite City'),
  createBarangay('Barangay 5', 'Barangay 5', 'Cavite City'),
  createBarangay('Barangay 50', 'Barangay 50', 'Cavite City'),
  createBarangay('Barangay 51', 'Barangay 51', 'Cavite City'),
  createBarangay('Barangay 52', 'Barangay 52', 'Cavite City'),
  createBarangay('Barangay 53', 'Barangay 53', 'Cavite City'),
  createBarangay('Barangay 53-A', 'Barangay 53-A', 'Cavite City'),
  createBarangay('Barangay 53-B', 'Barangay 53-B', 'Cavite City'),
  createBarangay('Barangay 54', 'Barangay 54', 'Cavite City'),
  createBarangay('Barangay 54-A', 'Barangay 54-A', 'Cavite City'),
  createBarangay('Barangay 55', 'Barangay 55', 'Cavite City'),
  createBarangay('Barangay 56', 'Barangay 56', 'Cavite City'),
  createBarangay('Barangay 57', 'Barangay 57', 'Cavite City'),
  createBarangay('Barangay 58', 'Barangay 58', 'Cavite City'),
  createBarangay('Barangay 58-A', 'Barangay 58-A', 'Cavite City'),
  createBarangay('Barangay 59', 'Barangay 59', 'Cavite City'),
  createBarangay('Barangay 6', 'Barangay 6', 'Cavite City'),
  createBarangay('Barangay 60', 'Barangay 60', 'Cavite City'),
  createBarangay('Barangay 61', 'Barangay 61', 'cavitecity'),
  createBarangay('Barangay 61-A', 'Barangay 61-A', 'Cavite City'),
  createBarangay('Barangay 62', 'Barangay 62', 'Cavite City'),
  createBarangay('Barangay 62-A', 'Barangay 62-A', 'Cavite City'),
  createBarangay('Barangay 62-B', 'Barangay 62-B', 'Cavite City'),
  createBarangay('Barangay 7', 'Barangay 7', 'Cavite City'),
  createBarangay('Barangay 8', 'Barangay 8', 'Cavite City'),
  createBarangay('Barangay 9', 'Barangay 9', 'Cavite City'),
  

/* INDANG */
  createBarangay('Agus-us', 'Agus-Us', 'indang'),
  createBarangay('Alulod', 'Alulod', 'indang'),
  createBarangay('Banaba Cerca', 'Aanaba Cerca', 'indang'),
  createBarangay('Banaba Lejos', 'Banaba Cejos', 'indang'),
  createBarangay('Bancod', 'Bancod', 'Indang'),
  createBarangay('Barangay 1', 'Barangay 1', 'Indang'),
  createBarangay('Barangay 2', 'Barangay 2', 'Indang'),
  createBarangay('Barangay 3', 'Barangay 3', 'Indang'),
  createBarangay('Barangay 4', 'Barangay 4', 'Indang'),
  createBarangay('Buna Cerca', 'Buna Cerca', 'Indang'),
  createBarangay('Buna Lejos 1', 'Buna Lejos 1', 'Indang'),
  createBarangay('Buna Lejos 2', 'Buna Lejos 2', 'Indang'),
  createBarangay('Calumpang Cerca', 'Calumpang Cerca', 'Indang'),
  createBarangay('Calumpang Lejos 1', 'Calumpang Lejos 1', 'Indang'),
  createBarangay('Carasuchi', 'Carasuchi', 'Indang'),
  createBarangay('Daine 1', 'Daine 1', 'Indang'),
  createBarangay('Daine 2', 'Daine 2', 'Indang'),
  createBarangay('Guyam Malaki', 'Guyam Malaki', 'Indang'),
  createBarangay('Guyam Munti', 'Guyam Munti', 'Indang'),
  createBarangay('Harasan', 'Harasan', 'Indang'),
  createBarangay('Kayquit 1', 'Kayquit 1', 'Indang'),
  createBarangay('Kayquit 2', 'Kayquit 2', 'Indang'),
  createBarangay('Kayquit 3', 'Kayquit 3', 'Indang'),
  createBarangay('Kaytambog', 'Kaytambog', 'Indang'),
  createBarangay('Kaytapos', 'Kaytapos', 'Indang'),
  createBarangay('Limbon', 'Limbon', 'Indang'),
  createBarangay('Lumampong Balagbag', 'Lumampong Balagbag', 'Indang'),
  createBarangay('Lumampong Halayhay', 'Lumampong Halayhay', 'Indang'),
  createBarangay('Mahabangkahoy Cerca', 'Mahabangkahoy Cerca', 'Indang'),
  createBarangay('Mahabangkahoy Lejos', 'Mahabangkahoy Lejos', 'Indang'),
  createBarangay('Mataas na Lupa', 'Mataas na Lupa', 'Indang'),
  createBarangay('Pulo', 'Pulo', 'Indang'),
  createBarangay('Tambo Balagbag', 'Tambo Balagbag', 'Indang'),
  createBarangay('Tambo Ilaya', 'Tambo Ilaya', 'Indang'),
  createBarangay('Tambo Kulit', 'Tambo Kulit', 'Indang'),
  createBarangay('Tambo Malaki', 'Tambo Malaki', 'Indang'),


/* SILANG */
  createBarangay('Acacia', 'Acacia', 'Silang'),
  createBarangay('Adlas', 'Adlas', 'Silang'),
  createBarangay('Anahaw 1', 'Anahaw 1', 'Silang'),
  createBarangay('Anahaw 2', 'Anahaw 2', 'Silang'),
  createBarangay('Balite 1', 'Balite 1', 'Silang'),
  createBarangay('Balite 2', 'Balite 2', 'Silang'),
  createBarangay('Balubad', 'Balubad', 'Silang'),
  createBarangay('Banaba', 'Banaba', 'Silang'),
  createBarangay('Barangay 1', 'Barangay 1', 'Silang'),
  createBarangay('Barangay 2', 'Barangay 2', 'Silang'),
  createBarangay('Barangay 3', 'Barangay 3', 'Silang'),
  createBarangay('Barangay 4', 'Barangay 4', 'Silang'),
  createBarangay('Barangay 5', 'Barangay 5', 'Silang'),
  createBarangay('Batas', 'Batas', 'Silang'),
  createBarangay('Biga 1', 'Biga 1', 'Silang'),
  createBarangay('Biga 2', 'Biga 2', 'Silang'),
  createBarangay('Biluso', 'Biluso', 'Silang'),
  createBarangay('Bucal', 'Bucal', 'Silang'),
  createBarangay('Buho', 'Buho', 'Silang'),
  createBarangay('Bulihan', 'Bulihan', 'Silang'),
  createBarangay('Cabangaan', 'Cabangaan', 'Silang'),
  createBarangay('Carmen', 'Carmen', 'Silang'),
  createBarangay('Hoyo', 'Hoyo', 'Silang'),
  createBarangay('Hukay', 'Hukay', 'Silang'),
  createBarangay('Iba', 'Iba', 'Silang'),
  createBarangay('Inchican', 'Inchican', 'Silang'),
  createBarangay('Ipil 1', 'Ipil 1', 'Silang'),
  createBarangay('Ipil 2', 'Ipil 2', 'silang'),
  createBarangay('Kalubkob', 'Kalubkob', 'Silang'),
  createBarangay('Kaong', 'Kaong', 'Silang'),
  createBarangay('Lalaan 1', 'Lalaan 1', 'Silang'),
  createBarangay('Lalaan 2', 'Lalaan 2', 'Silang'),
  createBarangay('Litlit', 'Litlit', 'Silang'),
  createBarangay('Lucsuhin', 'Lucsuhin', 'Silang'),
  createBarangay('Lumil', 'Lumil', 'Silang'),
  createBarangay('Maguyam', 'Maguyam', 'Silang'),
  createBarangay('Maguyam', 'Maguyam', 'Silang'),
  createBarangay('Malaking Tatyao', 'Malaking Tatyao', 'Silang'),
  createBarangay('Mataas na Burol', 'Mataas na Burol', 'Silang'),
  createBarangay('Munting Ilog', 'Munting Ilog', 'Silang'),
  createBarangay('Narra 1', 'Narra 1', 'Silang'),
  createBarangay('Narra 2', 'Narra 2', 'Silang'),
  createBarangay('Narra 3', 'Narra 3', 'Silang'),
  createBarangay('Paligawan', 'Paligawan', 'Silang'),
  createBarangay('Pasong Langka', 'Pasong Langka', 'Silang'),
  createBarangay('Pooc 1', 'Pooc 1', 'Silang'),
  createBarangay('Pooc 2', 'Pooc 2', 'Silang'),
  createBarangay('Pulong Bunga', 'Pulong Bunga', 'Silang'),
  createBarangay('Pulong Saging', 'Pulong Saging', 'Silang'),
  createBarangay('Puting Kahoy', 'Puting Kahoy', 'Silang'),
  createBarangay('Sabutan', 'Sabutan', 'Silang'),
  createBarangay('San Miguel 1', 'San Miguel 1', 'Silang'),
  createBarangay('San Miguel 2', 'San Miguel 2', 'Silang'),
  createBarangay('San Vicente 1', 'San Vicente 1', 'Silang'),
  createBarangay('San Vicente 2', 'San Vicente 2', 'Silang'),
  createBarangay('Santol', 'Santol', 'Silang'),
  createBarangay('Tartaria', 'Tartaria', 'Silang'),
  createBarangay('Tibig', 'Tibig', 'Silang'),
  createBarangay('Toledo', 'Toledo', 'Silang'),
  createBarangay('Tubuan 1', 'Tubuan 1', 'Silang'),
  createBarangay('Tubuan 2', 'Tubuan 2', 'Silang'),
  createBarangay('Tubuan 3', 'Tubuan 3', 'Silang'),
  createBarangay('Ulat', 'Ulat', 'Silang'),
  createBarangay('Yakal', 'Yakal', 'Silang'),


/* MAGALLANES */
  createBarangay('Baliwag', 'Baliwag', 'Magallanes'),
  createBarangay('Barangay 1', 'Barangay 1', 'Magallanes'),
  createBarangay('Barangay 2', 'Barangay 2', 'Magallanes'),
  createBarangay('Barangay 3', 'Barangay 3', 'Magallanes'),
  createBarangay('Barangay 4', 'Barangay 4', 'Magallanes'),
  createBarangay('Barangay 5', 'Barangay 5', 'Magallanes'),
  createBarangay('Bendita 1', 'Bendita 1', 'Magallanes'),
  createBarangay('Bendita 2', 'Bendita 2', 'Magallanes'),
  createBarangay('Caluangan', 'Caluangan', 'Magallanes'),
  createBarangay('Kabulusan', 'Kabulusan', 'Magallanes'),
  createBarangay('Medina', 'Medina', 'Magallanes'),
  createBarangay('Pacheco', 'Pacheco', 'Magallanes'),
  createBarangay('Ramirez', 'Ramirez', 'Magallanes'),
  createBarangay('San Agustin', 'San Agustin', 'Magallanes'),
  createBarangay('Tua', 'Tua', 'Magallanes'),
  createBarangay('Urdaneta', 'Urdaneta', 'Magallanes'),


/** GENERAL EMILIO AGUINALDO */
  createBarangay('A. Dalusag', 'A. Dalusag', 'General Emilio Aguinaldo'),
  createBarangay('Batas Dao', 'Batas Dao', 'General Emilio Aguinaldo'),
  createBarangay('Castanos Cerca', 'Castanos Cerca', 'General Emilio Aguinaldo'),
  createBarangay('Castanos Lejos', 'Castanos Lejos', 'General Emilio Aguinaldo'),
  createBarangay('Kabulusan', 'Kabulusan', 'General Emilio Aguinaldo'),
  createBarangay('Kaymisas', 'Kaymisas', 'General Emilio Aguinaldo'),
  createBarangay('Kaypaaba', 'Kaypaaba', 'General Emilio Aguinaldo'),
  createBarangay('Lumipa', 'Lumipa', 'General Emilio Aguinaldo'),
  createBarangay('Narvaez', 'Narvaez', 'General Emilio Aguinaldo'),
  createBarangay('Poblacion 1', 'Poblacion 1', 'General Emilio Aguinaldo'),
  createBarangay('Poblacion 2', 'Poblacion 2', 'General Emilio Aguinaldo'),
  createBarangay('Poblacion 3', 'Poblacion 3', 'General Emilio Aguinaldo'),
  createBarangay('Poblacion 4', 'Poblacion 4', 'General Emilio Aguinaldo'),
  createBarangay('Tabora', 'Tabora', 'General Emilio Aguinaldo'),


/** AMADEO */ 
  createBarangay('Banaybanay', 'Banaybanay', 'Amadeo'),
  createBarangay('Barangay 1', 'Barangay 1', 'Amadeo'),
  createBarangay('Barangay 2', 'Barangay 2', 'Amadeo'),
  createBarangay('Barangay 3', 'Barangay 3', 'Amadeo'),
  createBarangay('Barangay 4', 'Barangay 4', 'Amadeo'),
  createBarangay('Barangay 5', 'Barangay 5', 'Amadeo'),
  createBarangay('Barangay 6', 'Barangay 6', 'Amadeo'),
  createBarangay('Barangay 7', 'Barangay 7', 'Amadeo'),
  createBarangay('Barangay 8', 'Barangay 8', 'Amadeo'),
  createBarangay('Barangay 9', 'Barangay 9', 'Amadeo'),
  createBarangay('Barangay 10', 'Barangay 10', 'Amadeo'),
  createBarangay('Barangay 11', 'Barangay 11', 'Amadeo'),
  createBarangay('Barangay 12', 'Barangay 12', 'Amadeo'),
  createBarangay('Bucal', 'Bucal', 'Amadeo'),
  createBarangay('Buho', 'Buho', 'Amadeo'),
  createBarangay('Dagatan', 'Dagatan', 'Amadeo'),
  createBarangay('Halang', 'Halang', 'Amadeo'),
  createBarangay('Loma', 'Loma', 'Amadeo'),
  createBarangay('Maitim 1', 'Maitim 1', 'Amadeo'),
  createBarangay('Maymangga', 'Maymangga', 'Amadeo'),
  createBarangay('Minantok Kanluran', 'Minantok Kanluran', 'Amadeo'),
  createBarangay('Minantok Silangan', 'Minantok Silangan', 'Amadeo'),
  createBarangay('Pangil', 'Pangil', 'Amadeo'),
  createBarangay('Salaban', 'Salaban', 'Amadeo'),
  createBarangay('Talon', 'Talon', 'Amadeo'),
  createBarangay('Tamacan', 'Tamacan', 'Amadeo'),


/** Trece Martires*/ 
  createBarangay('Aguado', 'Aguado', 'Trece Martires'),
  createBarangay('Cabezas', 'Cabezas', 'Trece Martires'),
  createBarangay('Cabuco', 'Cabuco', 'Trece Martires'),
  createBarangay('Conchu', 'Conchu', 'Trece Martires'),
  createBarangay('De Ocampo', 'De Ocampo', 'Trece Martires'),
  createBarangay('Gregorio', 'Gregorio', 'Trece Martires'),
  createBarangay('Inocencio', 'Inocencio', 'Trece Martires'),
  createBarangay('Lallana', 'Lallana', 'Trece Martires'),
  createBarangay('Lapidario', 'Lapidario', 'Trece Martires'),
  createBarangay('Luciano', 'Luciano', 'Trece Martires'),
  createBarangay('Osorio', 'Osorio', 'Trece Martires'),
  createBarangay('Perez', 'Perez', 'Trece Martires'),
  createBarangay('San Agustin', 'San Agustin', 'Trece Martires'),


/** TANZA */ 
  createBarangay('Amaya 1', 'Amaya 1', 'Tanza'),
  createBarangay('Amaya 2', 'Amaya 2', 'Tanza'),
  createBarangay('Amaya 3', 'Amaya 3', 'Tanza'),
  createBarangay('Amaya 4', 'Amaya 4', 'Tanza'),
  createBarangay('Amaya 5', 'Amaya 5', 'Tanza'),
  createBarangay('Amaya 6', 'Amaya 6', 'Tanza'),
  createBarangay('Amaya 7', 'Amaya 7', 'Tanza'),
  createBarangay('Bagtas', 'Bagtas', 'Tanza'),
  createBarangay('Biga', 'Biga', 'Tanza'),
  createBarangay('Biwas', 'Biwas', 'Tanza'),
  createBarangay('Bucal', 'Bucal', 'Tanza'),
  createBarangay('Bunga', 'Bunga', 'nza'),
  createBarangay('Calibuyo', 'Calibuyo', 'Tanza'),
  createBarangay('Capipisa', 'Capipisa', 'Tanza'),
  createBarangay('Daang Amaya 1', 'Daang Amaya 1', 'Tanza'),
  createBarangay('Daang Amaya 2', 'Daang Amaya 2', 'Tanza'),
  createBarangay('Daang Amaya 3', 'Daang Amaya 3', 'Tanza'),
  createBarangay('Halayhay', 'Halayhay', 'Tanza'),
  createBarangay('Julugan 1', 'Julugan 1', 'Tanza'),
  createBarangay('Julugan 2', 'Julugan 2', 'Tanza'),
  createBarangay('Julugan 3', 'Julugan 3', 'Tanza'),
  createBarangay('Julugan 4', 'Julugan 4', 'Tanza'),
  createBarangay('Julugan 5', 'Julugan 5', 'Tanza'),
  createBarangay('Julugan 6', 'Julugan 6', 'Tanza'),
  createBarangay('Julugan 7', 'Julugan 7', 'Tanza'),
  createBarangay('Julugan 8', 'Julugan 8', 'Tanza'),
  createBarangay('Lambingan', 'Lambingan', 'Tanza'),
  createBarangay('Mulawin', 'Mulawin', 'Tanza'),
  createBarangay('Paradahan 1', 'Paradahan 1', 'Tanza'),
  createBarangay('Paradahan 2', 'Paradahan 2', 'Tanza'),
  createBarangay('Punta 1', 'Punta 1', 'Tanza'),
  createBarangay('Punta 2', 'Punta 2', 'Tanza'),
  createBarangay('Sahud Ulan', 'Sahud Ulan', 'Tanza'),
  createBarangay('Sanja Mayor', 'Sanja Mayor', 'Tanza'),
  createBarangay('Santol', 'Santol', 'Tanza'),
  createBarangay('Tanauan', 'Tanauan', 'Tanza'),
  createBarangay('Tres Cruses', 'Tres Cruses', 'Tanza'),



/** Dasmarinas */ 
  createBarangay('Burol ', 'Burol ', 'Dasmarinas'),
  createBarangay('Burol 1', 'Burol 1', 'Dasmarinas'),
  createBarangay('Burol 2', 'Burol 2', 'Dasmarinas'),
  createBarangay('Burol 3', 'Burol 3', 'Dasmarinas'),
  createBarangay('Datu Esmael', 'Datu Esmael', 'Dasmarinas'),
  createBarangay('Emmanuael Bergado 1', 'Emmanuael Bergado 1', 'dasma'),
  createBarangay('Emmanuael Bergado 2', 'Emmanuael Bergado 2', 'Dasmarinas'),
  createBarangay('Fatima 1', 'Fatima 1', 'Dasmarinas'),
  createBarangay('Fatima 2', 'Fatima 2', 'Dasmarinas'),
  createBarangay('Fatima 3', 'Fatima 3', 'Dasmarinas'),
  createBarangay('H-2', 'H-2', 'Dasmarinas'),
  createBarangay('Langkaan 1', 'Langkaan 1', 'Dasmarinas'),
  createBarangay('Langkaan 2', 'Langkaan 2', 'Dasmarinas'),
  createBarangay('Luzviminda 1', 'Luzviminda 1', 'Dasmarinas'),
  createBarangay('Luzviminda 2', 'Luzviminda 2', 'Dasmarinas'),
  createBarangay('Paliparan 1', 'Paliparan 1', 'Dasmarinas'),
  createBarangay('Paliparan 2', 'Paliparan 2', 'Dasmarinas'),
  createBarangay('Paliparan 3', 'Paliparan 3', 'Dasmarinas'),
  createBarangay('Sabang', 'Sabang', 'Dasmarinas'),
  createBarangay('Saint Peter 1', 'Saint Peter 1', 'Dasmarinas'),
  createBarangay('Saint Peter 2', 'Saint Peter 2', 'Dasmarinas'),
  createBarangay('Salawag', 'Salawag', 'Dasmarinas'),
  createBarangay('Salitran 1', 'Salitran 1', 'Dasmarinas'),
  createBarangay('Salitran 2', 'Salitran 2', 'Dasmarinas'),
  createBarangay('Salitran 3', 'Salitran 3', 'Dasmarinas'),
  createBarangay('Salitran 4', 'Salitran 4', 'Dasmarinas'),
  createBarangay('Sampaloc 1', 'Sampaloc 1', 'Dasmarinas'),
  createBarangay('Sampaloc 2', 'Sampaloc 2', 'Dasmarinas'),
  createBarangay('Sampaloc 3', 'Sampaloc 3', 'Dasmarinas'),
  createBarangay('Sampaloc 4', 'Sampaloc 4', 'Dasmarinas'),
  createBarangay('Sampaloc 5', 'Sampaloc 5', 'Dasmarinas'),
  createBarangay('San Agustin 1', 'San Agustin 1', 'Dasmarinas'),
  createBarangay('San Agustin 2', 'San Agustin 2', 'Dasmarinas'),
  createBarangay('San Agustin 3', 'San Agustin 3', 'Dasmarinas'),
  createBarangay('San Andres 1', 'San Andres 1', 'Dasmarinas'),
  createBarangay('San Andres 2', 'San Andres 2', 'Dasmarinas'),
  createBarangay('San Antonio de Padua 1', 'San Antonio de Padua 1', 'Dasmarinas'),
  createBarangay('San Antonio de Padua 2', 'San Antonio de Padua 2', 'Dasmarinas'),
  createBarangay('San Dionisio', 'San Dionisio', 'Dasmarinas'),
  createBarangay('San Esteban', 'San Esteban', 'Dasmarinas'),
  createBarangay('San Francisco 1', 'San Francisco 1', 'Dasmarinas'),
  createBarangay('San Francisco 2', 'San Francisco 2', 'Dasmarinas'),
  createBarangay('San Isidro Labrador 1', 'San Isidro Labrador 1', 'Dasmarinas'),
  createBarangay('San Isidro Labrador 2', 'San Isidro Labrador 2', 'Dasmarinas'),
  createBarangay('San Jose', 'San Jose', 'Dasmarinas'),
  createBarangay('San Juan', 'San Juan', 'Dasmarinas'),
  createBarangay('San Lorenzo Ruiz 1', 'San Lorenzo Ruiz 1', 'Dasmarinas'),
  createBarangay('San Lorenzo Ruiz 2', 'San Lorenzo Ruiz 2', 'Dasmarinas'),
  createBarangay('San Mateo', 'San Mateo', 'Dasmarinas'),
  createBarangay('San Miguel', 'San Miguel', 'Dasmarinas'),
  createBarangay('San Miguel 2', 'San Miguel 2', 'Dasmarinas'),
  createBarangay('San Nicolas 1', 'San Nicolas 1', 'Dasmarinas'),
  createBarangay('San Nicolas 2', 'San Nicolas 2', 'Dasmarinas'),
  createBarangay('San Roque', 'San Roque', 'Dasmarinas'),
  createBarangay('San Simon', 'San Simon', 'Dasmarinas'),
  createBarangay('Santa Christina 1', 'Santa Christina 1', 'Dasmarinas'),
  createBarangay('Santa Christina 2', 'Santa Christina 2', 'dasma'),
  createBarangay('Santa Cruz 1', 'Santa Cruz 1', 'Dasmarinas'),
  createBarangay('Santa Cruz 2', 'Santa Cruz 2', 'Dasmarinas'),
  createBarangay('Santa Fe', 'Santa Fe', 'Dasmarinas'),
  createBarangay('Santa Lucia', 'Santa Lucia', 'Dasmarinas'),
  createBarangay('Santa Maria', 'Santa Maria', 'Dasmarinas'),
  createBarangay('Santa Cristo', 'Santa Cristo', 'Dasmarinas'),
  createBarangay('Santo Nino 1', 'Santo Nino 1', 'Dasmarinas'),
  createBarangay('Santo Nino 2', 'Santo Nino 2', 'Dasmarinas'),
  createBarangay('Victoria Reyes', 'Victoria Reyes', 'Dasmarinas'),
  createBarangay('Zone 1', 'Zone 1', 'Dasmarinas'),
  createBarangay('Zone 1-B', 'Zone 1-B', 'Dasmarinas'),
  createBarangay('Zone 2', 'Zone 2', 'Dasmarinas'),
  createBarangay('Zone 3', 'Zone 3', 'Dasmarinas'),
  createBarangay('Zone 4', 'Zone 4', 'Dasmarinas'),


/** General Trias  */ 
  createBarangay('Alingaro', 'Alingaro', 'General Trias'),
  createBarangay('Arnaldo Poblacion', 'Arnaldo Poblacion', 'General Trias'),
  createBarangay('Bacao 1', 'Bacao 1', 'General Trias'),
  createBarangay('Bacao 2', 'Bacao 2', 'General Trias'),
  createBarangay('Bagumbayan Poblacion', 'Bagumbayan Poblacion', 'General Trias'),
  createBarangay('Biclatan', 'Biclatan', 'General Trias'),
  createBarangay('Buenavista 1', 'Buenavista 1', 'General Trias'),
  createBarangay('Buenavista 2', 'Buenavista 2', 'General Trias'),
  createBarangay('Buenavista 3', 'Buenavista 3', 'General Trias'),
  createBarangay('Corregidor Poblacion', 'Corregidor Poblacion', 'General Trias'),
  createBarangay('Dulong Bayan Poblacion', 'Dulong Bayan Poblacion', 'General Trias'),
  createBarangay('Gov. Ferrer Poblacion', 'Gov. Ferrer Poblacion', 'General Trias'),
  createBarangay('Javalera', 'Javalera', 'General Trias'),
  createBarangay('Manggahan', 'Manggahan', 'General Trias'),
  createBarangay('Navarro', 'Navarro', 'General Trias'),
  createBarangay('Ninety Sixth Poblacion', 'Ninety Sixth Poblacion', 'General Trias'),
  createBarangay('Panungyanan', 'Panungyanan', 'General Trias'),
  createBarangay('Pasong Camachille 1', 'Pasong Camachille 1', 'General Trias'),
  createBarangay('Pasong Camachille 2', 'Pasong Camachille 2', 'General Trias'),
  createBarangay('Pasong Kawayan 1', 'Pasong Kawayan 1', 'General Trias'),
  createBarangay('Pasong Kawayan 2', 'Pasong Kawayan 2', 'General Trias'),
  createBarangay('Prinza Poblacion', 'Prinza Poblacion', 'General Trias'),
  createBarangay('Sampalucan Poblacion', 'Sampalucan Poblacion', 'General Trias'),
  createBarangay('San Francisco', 'San Francisco', 'General Trias'),
  createBarangay('San Gabriel Poblacion', 'San Gabriel Poblacion', 'General Trias'),
  createBarangay('San Juan 1', 'San Juan 1', 'General Trias'),
  createBarangay('San Juan 2', 'San Juan 2', 'General Trias'),
  createBarangay('Santa Clara', 'Santa Clara', 'General Trias'),
  createBarangay('Santiago', 'Santiago', 'General Trias'),
  createBarangay('Tapia', 'Tapia', 'General Trias'),
  createBarangay('Tejero', 'Tejero', 'General Trias'),
  createBarangay('Vibora Poblacion', 'Vibora Poblacion', 'General Trias'),


/** General Mariano Alvarez  */
  createBarangay('Aldiano Olaes', 'Aldiano Olaes', 'General Mariano Alvarez'),
  createBarangay('Barangay 1 Poblacion', 'Barangay 1 Poblacion', 'General Mariano Alvarez'),
  createBarangay('Barangay 2 Poblacion', 'Barangay 2 Poblacion', 'General Mariano Alvarez'),
  createBarangay('Barangay 3 Poblacion', 'Barangay 3 Poblacion', 'General Mariano Alvarez'),
  createBarangay('Barangay 4 Poblacion', 'Barangay 4 Poblacion', 'General Mariano Alvarez'),
  createBarangay('Barangay 5 Poblacion', 'Barangay 5 Poblacion', 'General Mariano Alvarez'),
  createBarangay('Benjamin Tirona', 'Benjamin Tirona', 'General Mariano Alvarez'),
  createBarangay('Bernardo Pulido', 'Bernardo Pulido', 'General Mariano Alvarez'),
  createBarangay('Epifanio Malia', 'Epifanio Malia', 'General Mariano Alvarez'),
  createBarangay('Fiorello Calimag', 'Fiorello Calimag', 'General Mariano Alvarez'),
  createBarangay('Francisco de Castro', 'Francisco de Castro', 'General Mariano Alvarez'),
  createBarangay('Francisco Reyes', 'Francisco Reyes', 'General Mariano Alvarez'),
  createBarangay('Gavino Maderan', 'Gavino Maderan', 'General Mariano Alvarez'),
  createBarangay('Gregoria de Jesus', 'Gregoria de Jesus', 'General Mariano Alvarez'),
  createBarangay('Inocencio Salud', 'Inocencio Salud', 'General Mariano Alvarez'),
  createBarangay('Jacinto Lumberas', 'Jacinto Lumberas', 'General Mariano Alvarez'),
  createBarangay('Kapitan Kua', 'Kapitan Kua', 'General Mariano Alvarez'),
  createBarangay('Koronel Jose P. Elises', 'Koronel Jose P. Elises', 'General Mariano Alvarez'),
  createBarangay('Macario Dacon', 'Macario Dacon', 'General Mariano Alvarez'),
  createBarangay('Marcelino Memjie', 'Marcelino Memjie', 'General Mariano Alvarez'),
  createBarangay('Nicolasa Virata', 'Nicolasa Virata', 'General Mariano Alvarez'),
  createBarangay('Pantaleon Granados', 'Pantaleon Granados', 'General Mariano Alvarez'),
  createBarangay('Ramon Cruz', 'Ramon Cruz', 'General Mariano Alvarez'),
  createBarangay('San Gabriel', 'San Gabriel', 'General Mariano Alvarez'),
  createBarangay('San Jose', 'San Jose', 'General Mariano Alvarez'),
  createBarangay('Severino de Las Alas', 'Severino de Las Alas', 'General Mariano Alvarez'),
  createBarangay('Tiniente Tiago', 'Tiniente Tiago', 'General Mariano Alvarez'),

/** ALFONSO  */
  createBarangay('Amuyong', 'Amuyong', 'Alfonso'),
  createBarangay('Barangay 1', 'Barangay 1', 'Alfonso'),
  createBarangay('Barangay 2', 'Barangay 2', 'Alfonso'),
  createBarangay('Barangay 3', 'Barangay 3', 'Alfonso'),
  createBarangay('Barangay 4', 'Barangay 4', 'Alfonso'),
  createBarangay('Barangay 5', 'Barangay 5', 'Alfonso'),
  createBarangay('Bilog', 'Bilog', 'Alfonso'),
  createBarangay('Buck State', 'Buck State', 'Alfonso'),
  createBarangay('Esperanza Ibaba', 'Esperanza Ibaba', 'Alfonso'),
  createBarangay('Esperanza Ilaya', 'Esperanza Ilaya', 'Alfonso'),
  createBarangay('Kaysuyo', 'Kaysuyo', 'Alfonso'),
  createBarangay('Kaytitinga 1', 'Kaytitinga 1', 'Alfonso'),
  createBarangay('Kaytitinga 2', 'Kaytitinga 2', 'Alfonso'),
  createBarangay('Kaytitinga 3', 'Kaytitinga 3', 'Alfonso'),
  createBarangay('Luksuhin', 'Luksuhin', 'Alfonso'),
  createBarangay('Luksuhin Ilaya', 'Luksuhin Ilaya', 'Alfonso'),
  createBarangay('Mangas 1', 'Mangas 1', 'Alfonso'),
  createBarangay('Mangas 2', 'Mangas 2', 'Alfonso'),
  createBarangay('Marahan 1', 'Marahan 1', 'Alfonso'),
  createBarangay('Marahan 2', 'Marahan 2', 'Alfonso'),
  createBarangay('Matagbak 1', 'Matagbak 1', 'Alfonso'),
  createBarangay('Matagbak 2', 'Matagbak 2', 'Alfonso'),
  createBarangay('Pajo', 'Pajo', 'Alfonso'),
  createBarangay('Palumlum', 'Palumlum', 'aAfonso'),
  createBarangay('Santa Teresa', 'Santa Teresa', 'Alfonso'),
  createBarangay('Sikat', 'Sikat', 'Alfonso'),
  createBarangay('Sinaliw Malaki', 'Sinaliw Malaki', 'Alfonso'),
  createBarangay('Sinaliw na Munti', 'Sinaliw na Munti', 'Alfonso'),
  createBarangay('Sulsugin', 'Sulsugin', 'Alfonso'),
  createBarangay('Taywanak Ibaba', 'Taywanak Ibaba', 'Alfonso'),
  createBarangay('Taynawak Ilaya', 'Taynawak Ilaya', 'Alfonso'),
  createBarangay('Upli', 'Upli', 'Alfonso'),

/** BACOOR  */ 
  createBarangay('Alima', 'Alima', 'Bacoor'),
  createBarangay('Aniban 1', 'Aniban 1', 'Bacoor'),
  createBarangay('Aniban 2', 'Aniban 2', 'Bacoor'),
  createBarangay('Aniban 3', 'Aniban 3', 'Bacoor'),
  createBarangay('Aniban 4', 'Aniban 4', 'Bacoor'),
  createBarangay('Aniban 5', 'Aniban 5', 'Bacoor'),
  createBarangay('Banalo', 'Banalo', 'Bacoor'),
  createBarangay('Bayanan', 'Bayanan', 'Bacoor'),
  createBarangay('Campo Santo', 'Campo Santo', 'Bacoor'),
  createBarangay('Daang Bukid', 'Daang Bukid', 'Bacoor'),
  createBarangay('Digma', 'Digma', 'Bacoor'),
  createBarangay('Dulong Bayan', 'Dulong Bayan', 'Bacoor'),
  createBarangay('Habay 1', 'Habay 1', 'Bacoor'),
  createBarangay('Habay 2', 'Habay 2', 'Bacoor'),
  createBarangay('Kaingin', 'Kaingin', 'Bacoor'),
  createBarangay('Ligas 1', 'Ligas 1', 'Bacoor'),
  createBarangay('Ligas 2', 'Ligas 2', 'Bacoor'),
  createBarangay('Ligas 3', 'Ligas 3', 'Bacoor'),
  createBarangay('Mabolo 1', 'Mabolo 1', 'Bacoor'),
  createBarangay('Mabolo 2', 'Mabolo 2', 'Bacoor'),
  createBarangay('Mabolo 3', 'Mabolo 3', 'Bacoor'),
  createBarangay('Mambog 1', 'Mambog 1', 'Bacoor'),
  createBarangay('Mambog 2', 'Mambog 2', 'Bacoor'),
  createBarangay('Mambog 3', 'Mambog 3', 'Bacoor'),
  createBarangay('Mambog 4', 'Mambog 4', 'Bacoor'),
  createBarangay('Mambog 5', 'Mambog 5', 'Bacoor'),
  createBarangay('Molino 1', 'Molino 1', 'Bacoor'),
  createBarangay('Molino 2', 'Molino 2', 'Bacoor'),
  createBarangay('Molino 3', 'Molino 3', 'Bacoor'),
  createBarangay('Molino 4', 'Molino 4', 'Bacoor'),
  createBarangay('Molino 5', 'Molino 5', 'Bacoor'),
  createBarangay('Molino 6', 'Molino 6', 'Bacoor'),
  createBarangay('Molino 7', 'Molino 7', 'Bacoor'),
  createBarangay('Niog 1', 'Niog 1', 'Bacoor'),
  createBarangay('Niog 2', 'Niog 2', 'Bacoor'),
  createBarangay('Niog 3', 'Niog 3', 'Bacoor'),
  createBarangay('P. F. Espiritu 1', 'P. F. Espiritu 1', 'Bacoor'),
  createBarangay('P. F. Espiritu 2', 'P. F. Espiritu 2', 'Bacoor'),
  createBarangay('P. F. Espiritu 3', 'P. F. Espiritu 3', 'Bacoor'),
  createBarangay('P. F. Espiritu 4', 'P. F. Espiritu 4', 'Bacoor'),
  createBarangay('P. F. Espiritu 5', 'P. F. Espiritu 5', 'Bacoor'),
  createBarangay('P. F. Espiritu 6', 'P. F. Espiritu 6', 'Bacoor'),
  createBarangay('P. F. Espiritu 7', 'P. F. Espiritu 7', 'Bacoor'),
  createBarangay('P. F. Espiritu 8', 'P. F. Espiritu 8', 'Bacoor'),
  createBarangay('Queens Row Central', 'Queens Row Central', 'Bacoor'),
  createBarangay('Queens Row East', 'Queens Row East', 'Bacoor'),
  createBarangay('Queens Row West', 'Queens Row West', 'Bacoor'),
  createBarangay('Real 1', 'Real 1', 'Bacoor'),
  createBarangay('Real 2', 'Real 2', 'Bacoor'),
  createBarangay('Salinas 1', 'Salinas 1', 'Bacoor'),
  createBarangay('Salinas 2', 'Salinas 2', 'Bacoor'),
  createBarangay('Salinas 3', 'Salinas 3', 'Bacoor'),
  createBarangay('Salinas 4', 'Salinas 4', 'Bacoor'),
  createBarangay('San Nicolas 1', 'San Nicolas 1', 'Bacoor'),
  createBarangay('San Nicolas 2', 'San Nicolas 2', 'Bacoor'),
  createBarangay('San Nicolas 3', 'San Nicolas 3', 'Bacoor'),
  createBarangay('Sinegluelasan', 'Sinegluelasan', 'Bacoor'),
  createBarangay('Sinegluelasan', 'Sinegluelasan', 'Bacoor'),
  createBarangay('Sinegluelasan', 'Sinegluelasan', 'Bacoor'),
  createBarangay('Talaba 1', 'Talaba 1', 'Bacoor'),
  createBarangay('Talaba 2', 'Talaba 2', 'Bacoor'),
  createBarangay('Talaba 3', 'Talaba 3', 'Bacoor'),
  createBarangay('Talaba 4', 'Talaba 4', 'Bacoor'),
  createBarangay('Talaba 5', 'Talaba 5', 'Bacoor'),
  createBarangay('Talaba 6', 'Talaba 6', 'Bacoor'),
  createBarangay('Talaba 7', 'Talaba 7', 'Bacoor'),
  createBarangay('Zapote 1', 'Zapote 1', 'Bacoor'),
  createBarangay('Zapote 2', 'Zapote 2', 'Bacoor'),
  createBarangay('Zapote 3', 'Zapote 3', 'Bacoor'),
  createBarangay('Zapote 4', 'Zapote 4', 'Bacoor'),
  createBarangay('Zapote 5', 'Zapote 5', 'Bacoor'),

/** MENDEZ  */
  createBarangay('Anuling Cerca 1', 'Anuling Cerca 1', 'Mendez'),
  createBarangay('Anuling Cerca 2', 'Anuling Cerca 2', 'Mendez'),
  createBarangay('Anuling Lejos 1', 'Anuling Lejos 1', 'Mendez'),
  createBarangay('Anuling Lejos 2', 'Anuling Lejos 2', 'Mendez'),
  createBarangay('Asis 1', 'Asis 1', 'Mendez'),
  createBarangay('Asis 2', 'Asis 2', 'Mendez'),
  createBarangay('Asis 3', 'Asis 3', 'Mendez'),
  createBarangay('Banayad', 'Banayad', 'Mendez'),
  createBarangay('Bukal', 'Bukal', 'Mendez'),
  createBarangay('Galicia 1', 'Galicia 1', 'Mendez'),
  createBarangay('Galicia 2', 'Galicia 2', 'Mendez'),
  createBarangay('Galicia 3', 'Galicia 3', 'Mendez'),
  createBarangay('Miguel Mojica', 'Miguel Mojica', 'Mendez'),
  createBarangay('Palopoc 1', 'Palopoc 1', 'Mendez'),
  createBarangay('Palopoc 2', 'Palopoc 2', 'Mendez'),
  createBarangay('Panungyan 1', 'Panungyan 1', 'Mendez'),
  createBarangay('Panungyan 2', 'Panungyan 2', 'Mendez'),
  createBarangay('Poblacion 1', 'Poblacion 1', 'Mendez'),
  createBarangay('Poblacion 2', 'Poblacion 2', 'Mendez'),
  createBarangay('Poblacion 3', 'Poblacion 3', 'Mendez'),
  createBarangay('Poblacion 4', 'Poblacion 4', 'Mendez'),
  createBarangay('Poblacion 5', 'Poblacion 5', 'Mendez'),
  createBarangay('Poblacion 6', 'Poblacion 6', 'Mendez'),
  createBarangay('Poblacion 7', 'Poblacion 7', 'Mendez'),

/** CARMONAC*/
  createBarangay('Bancal', 'Bancal', 'Carmona'),
  createBarangay('Barangay 1', 'Barangay 1', 'Carmona'),
  createBarangay('Barangay 2', 'Barangay 2', 'Carmona'),
  createBarangay('Barangay 3', 'Barangay 3', 'Carmona'),
  createBarangay('Barangay 4', 'Barangay 4', 'Carmona'),
  createBarangay('Barangay 5', 'Barangay 5', 'Carmona'),
  createBarangay('Barangay 6', 'Barangay 6', 'Carmona'),
  createBarangay('Barangay 7', 'Barangay 7', 'Carmona'),
  createBarangay('Barangay 8', 'Barangay 8', 'Carmona'),
  createBarangay('Cabilang Bahay', 'Cabilang Bahay', 'Carmona'),
  createBarangay('Lantic', 'Lantic', 'Carmona'),
  createBarangay('Mabuhay', 'Mabuhay', 'Carmona'),
  createBarangay('Maduya', 'Maduya', 'Carmona'),
  createBarangay('Milagrosa', 'Milagrosa', 'Carmona'),

/** IMUS */
  createBarangay('Alapan 1-A', 'Alapan 1-A', 'Imus'),
  createBarangay('Alapan 1-B', 'Alapan 1-B', 'Imus'),
  createBarangay('Alapan 1-C', 'Alapan 1-C', 'Imus'),
  createBarangay('Alapan 2-A', 'Alapan 2-A', 'Imus'),
  createBarangay('Alapan 2-B', 'Alapan 2-B', 'Imus'),
  createBarangay('Anabu 1-A', 'Anabu 1-A', 'Imus'),
  createBarangay('Anabu 1-B', 'Anabu 1-B', 'Imus'),
  createBarangay('Anabu 1-C', 'Anabu 1-C', 'Imus'),
  createBarangay('Anabu 1-D', 'Anabu 1-D', 'Imus'),
  createBarangay('Anabu 1-E', 'Anabu 1-E', 'Imus'),
  createBarangay('Anabu 1-F', 'Anabu 1-F', 'Imus'),
  createBarangay('Anabu 1-G', 'Anabu 1-G', 'Imus'),
  createBarangay('Anabu 2-A', 'Anabu 2-A', 'Imus'),
  createBarangay('Anabu 2-B', 'Anabu 2-B', 'Imus'),
  createBarangay('Anabu 2-C', 'Anabu 2-C', 'Imus'),
  createBarangay('Anabu 2-D', 'Anabu 2-D', 'Imus'),
  createBarangay('Anabu 2-E', 'Anabu 2-E', 'Imus'),
  createBarangay('Anabu 2-F', 'Anabu 2-F', 'Imus'),
  createBarangay('Bayan Luma 1', 'Bayan Luma 1', 'Imus'),
  createBarangay('Bayan Luma 2', 'Bayan Luma 2', 'Imus'),
  createBarangay('Bayan Luma 3', 'Bayan Luma 3', 'Imus'),
  createBarangay('Bayan Luma 4', 'Bayan Luma 4', 'Imus'),
  createBarangay('Bayan Luma 5', 'Bayan Luma 5', 'Imus'),
  createBarangay('Bayan Luma 6', 'Bayan Luma 6', 'Imus'),
  createBarangay('Bayan Luma 7', 'Bayan Luma 7', 'Imus'),
  createBarangay('Bayan Luma 8', 'Bayan Luma 8', 'Imus'),
  createBarangay('Bayan Luma 9', 'Bayan Luma 9', 'Imus'),
  createBarangay('Bucandala 1', 'Bucandala 1', 'Imus'),
  createBarangay('Bucandala 1', 'Bucandala 1', 'Imus'),
  createBarangay('Bucandala 1', '', 'Imus'),
  createBarangay('Bucandala 1', 'Bucandala 1', 'Imus'),
  createBarangay('Bucandala 1', 'Bucandala 1', 'Imus'),
  createBarangay('Buhay na Tubig', 'Buhay na Tubig', 'Imus'),
  createBarangay('Carsadang Bago 1', 'Carsadang Bago 1', 'Imus'),
  createBarangay('Carsadang Bago 2', 'Carsadang Bago 2', 'Imus'),
  createBarangay('Magdalo', 'Magdalo', 'Imus'),
  createBarangay('Maharlika', 'Maharlika', 'Imus'),
  createBarangay('Malagasang 1-A', 'Malagasang 1-A', 'Imus'),
  createBarangay('Malagasang 1-B', 'Malagasang 1-B', 'Imus'),
  createBarangay('Malagasang 1-C', 'Malagasang 1-C', 'Imus'),
  createBarangay('Malagasang 1-D', 'Malagasang 1-D', 'Imus'),
  createBarangay('Malagasang 1-E', 'Malagasang 1-E', 'Imus'),
  createBarangay('Malagasang 1-F', 'Malagasang 1-F', 'Imus'),
  createBarangay('Malagasang 1-G', 'Malagasang 1-G', 'Imus'),
  createBarangay('Malagasang 2-A', 'Malagasang 2-A', 'Imus'),
  createBarangay('Malagasang 2-B', 'Malagasang 2-B', 'Imus'),
  createBarangay('Malagasang 2-C', 'Malagasang 2-C', 'Imus'),
  createBarangay('Malagasang 2-D', 'Malagasang 2-D', 'Imus'),
  createBarangay('Malagasang 2-E', 'Malagasang 2-E', 'Imus'),
  createBarangay('Malagasang 2-F', 'Malagasang 2-F', 'Imus'),
  createBarangay('Malagasang 2-G', 'Malagasang 2-G', 'Imus'),
  createBarangay('Mariano Espeleta 1', 'Mariano Espeleta 1', 'Imus'),
  createBarangay('Mariano Espeleta 2', 'Mariano Espeleta 2', 'Imus'),
  createBarangay('Mariano Espeleta 3', 'Mariano Espeleta 3', 'Imus'),
  createBarangay('Medicion 1-A', 'Medicion 1-A', 'Imus'),
  createBarangay('Medicion 1-B', 'Medicion 1-B', 'Imus'),
  createBarangay('Medicion 1-C', 'Medicion 1-C', 'Imus'),
  createBarangay('Medicion 1-D', 'Medicion 1-D', 'Imus'),
  createBarangay('Medicion 2-A', 'Medicion 2-A', 'Imus'),
  createBarangay('Medicion 2-B', 'Medicion 2-B', 'Imus'),
  createBarangay('Medicion 2-C', 'Medicion 2-C', 'Imus'),
  createBarangay('Medicion 2-D', 'Medicion 2-D', 'Imus'),
  createBarangay('Medicion 2-E', 'Medicion 2-E', 'Imus'),
  createBarangay('Medicion 2-F', 'Medicion 2-F', 'Imus'),
  createBarangay('Pag-asa 1', 'Pag-asa 1', 'Imus'),
  createBarangay('Pag-asa 2', 'Pag-asa 2', 'Imus'),
  createBarangay('Pag-asa 3', 'Pag-asa 3', 'Imus'),
  createBarangay('Palico 1', 'Palico 1', 'Imus'),
  createBarangay('Palico 2', 'Palico 2', 'Imus'),
  createBarangay('Palico 3', 'Palico 3', 'Imus'),
  createBarangay('Palico 4', 'Palico 4', 'Imus'),
  createBarangay('Pasong Buaya 1', 'Pasong Buaya 1', 'Imus'),
  createBarangay('Pasong Buaya 2', 'Pasong Buaya 2', 'Imus'),
  createBarangay('Pinagbuklod', 'Pinagbuklod', 'Imus'),
  createBarangay('Poblacion 1-A', 'Poblacion 1-A', 'Imus'),
  createBarangay('Poblacion 1-B', 'Poblacion 1-B', 'Imus'),
  createBarangay('Poblacion 1-C', 'Poblacion 1-C', 'Imus'),
  createBarangay('Poblacion 2-A', 'Poblacion 2-A', 'Imus'),
  createBarangay('Poblacion 2-B', 'Poblacion 2-B', 'Imus'),
  createBarangay('Poblacion 3-A', 'Poblacion 3-A', 'Imus'),
  createBarangay('Poblacion 3-B', 'Poblacion 3-B', 'Imus'),
  createBarangay('Poblacion 4-A', 'Poblacion 4-A', 'Imus'),
  createBarangay('Poblacion 4-B', 'Poblacion 4-B', 'Imus'),
  createBarangay('Poblacion 4-C', 'Poblacion 4-C', 'Imus'),
  createBarangay('Poblacion 4-D', 'Poblacion 4-D', 'Imus'),
  createBarangay('Tanzang Luma 1', 'Tanzang Luma 1', 'Imus'),
  createBarangay('Tanzang Luma 2', 'Tanzang Luma 2', 'Imus'),
  createBarangay('Tanzang Luma 3', 'Tanzang Luma 3', 'Imus'),
  createBarangay('Tanzang Luma 4', 'Tanzang Luma 4', 'Imus'),
  createBarangay('Tanzang Luma 5', 'Tanzang Luma 5', 'Imus'),
  createBarangay('Tanzang Luma 6', 'Tanzang Luma 6', 'Imus'),
  createBarangay('Toclong 1-A', 'Toclong 1-A', 'Imus'),
  createBarangay('Toclong 1-B', 'Toclong 1-B', 'Imus'),
  createBarangay('Toclong 1-C', 'Toclong 1-C', 'Imus'),
  createBarangay('Toclong 2-A', 'Toclong 2-A', 'Imus'),
  createBarangay('Toclong 2-B', 'Toclong 2-B', 'Imus'),


/** KAWIT */
  createBarangay('Balsahan-Bisita', 'Balsahan-Bisita', 'Kawit'),
  createBarangay('Batong Dalig', 'Batong Dalig', 'Kawit'),
  createBarangay('Binakayan-Aplaya', 'Binakayan-Aplaya', 'Kawit'),
  createBarangay('Binakayan-Kanluran', 'Binakayan-Kanluran', 'Kawit'),
  createBarangay('Congbalay-Legaspi', 'Congbalay-Legaspi', 'Kawit'),
  createBarangay('Gahak', 'Gahak', 'Kawit'),
  createBarangay('Kaingen', 'Kaingen', 'Kawit'),
  createBarangay('Magdalo', 'Magdalo', 'Kawit'),
  createBarangay('Manggahan-Lawin', 'Manggahan-Lawin', 'Kawit'),
  createBarangay('Marulas', 'Marulas', 'Kawit'),
  createBarangay('Panamitan', 'Panamitan', 'Kawit'),
  createBarangay('Poblacion', 'Poblacion', 'Kawit'),
  createBarangay('Pulvorista', 'Pulvorista', 'Kawit'),
  createBarangay('Samala-Marquez', 'Samala-Marquez', 'Kawit'),
  createBarangay('San Sebastian', 'San Sebastian', 'Kawit'),
  createBarangay('Santa Isabel', 'Santa Isabel', 'Kawit'),
  createBarangay('Tabon 1', 'Tabon 1', 'Kawit'),
  createBarangay('Tabon 2', 'Tabon 2', 'Kawit'),
  createBarangay('Tabon 3', 'Tabon 3', 'Kawit'),
  createBarangay('Toclong', 'Toclong', 'Kawit'),
  createBarangay('Tramo-Bantayan', 'Tramo-Bantayan', 'Kawit'),
  createBarangay('Wakas 1', 'Wakas 1', 'Kawit'),
  createBarangay('Wakas 2', 'Wakas 2', 'Kawit'),


/** MARAGONDON */
  createBarangay('Bucal 1', 'Bucal 1', 'Maragondon'),
  createBarangay('Bucal 2', 'Bucal 2', 'Maragondon'),
  createBarangay('Bucal 3A', 'Bucal 3A', 'Maragondon'),
  createBarangay('Bucal 3B', 'Bucal 3B', 'Maragondon'),
  createBarangay('Bucal 4A', 'Bucal 4A', 'Maragondon'),
  createBarangay('Bucal 4B', 'Bucal 4B', 'maragondon'),
  createBarangay('Caingin Poblacion', 'Caingin Poblacion', 'Maragondon'),
  createBarangay('Garita 1A', 'Garita 1A', 'Maragondon'),
  createBarangay('Garita 1B', 'Garita 1B', 'Maragondon'),
  createBarangay('Layong Mabilog', 'Layong Mabilog', 'Maragondon'),
  createBarangay('Mabato', 'Mabato', 'Maragondon'),
  createBarangay('Pantihhan 1', 'Pantihhan 1', 'Maragondon'),
  createBarangay('Pantihhan 2', 'Pantihhan 2', 'Maragondon'),
  createBarangay('Pantihhan 3', 'Pantihhan 3', 'Maragondon'),
  createBarangay('Pantihhan 4', 'Pantihhan 4', 'Maragondon'),
  createBarangay('Patungan', 'Patungan', 'Maragondon'),
  createBarangay('Pinagsanhan 1A', 'Pinagsanhan 1A', 'Maragondon'),
  createBarangay('Pinagsanhan 1B', 'Pinagsanhan 1B', 'Maragondon'),
  createBarangay('Poblacion 1A', 'Poblacion 1A', 'Maragondon'),
  createBarangay('Poblacion 1B', 'Poblacion 1B', 'Maragondon'),
  createBarangay('Poblacion 2A', 'Poblacion 2A', 'Maragondon'),
  createBarangay('Poblacion 2B', 'Poblacion 2B', 'Maragondon'),
  createBarangay('San Miguel 1A', 'San Miguel 1A', 'Maragondon'),
  createBarangay('San Miguel 2B', 'San Miguel 2B', 'Maragondon'),
  createBarangay('Talipsungo', 'Talipsungo', 'Maragondon'),
  createBarangay('Tulay Kanluran', 'Tulay Kanluran', 'Maragondon'),
  createBarangay('Tulay Silangan', 'Tulay Silangan', 'Maragondon'),


/** TERNATE */
  createBarangay('Bucana', 'Bucana', 'Ternate'),
  createBarangay('Poblacion 1', 'Poblacion 1', 'Ternate'),
  createBarangay('Poblacion 1A', 'Poblacion 1A', 'Ternate'),
  createBarangay('Poblacion 2', 'Poblacion 2', 'Ternate'),
  createBarangay('Poblacion 3', 'Poblacion 3', 'Ternate'),
  createBarangay('San Jose', 'San Jose', 'Ternate'),
  createBarangay('San Juan 1', 'San Juan 1', 'Ternate'),
  createBarangay('San Juan 2', 'San Juan 2', 'Ternate'),
  createBarangay('Sapang 1', 'Sapang 1', 'Ternate'),
  createBarangay('Sapang 2', 'Sapang 2', 'Ternate'),

/** ROSARIO rosario*/
  createBarangay('Bagbag 1', 'Bagbag 1', 'Rosario'),
  createBarangay('Bagbag 2', 'Bagbag 2', 'Rosario'),
  createBarangay('Kanluran', 'Kanluran', 'Rosario'),
  createBarangay('Ligtong 1', 'Ligtong 1', 'Rosario'),
  createBarangay('Ligtong 2', 'Ligtong 2', 'Rosario'),
  createBarangay('Ligtong 3', 'Ligtong 3', 'Rosario'),
  createBarangay('Ligtong 4', 'Ligtong 4', 'Rosario'),
  createBarangay('Muzon 1', 'Muzon 1', 'Rosario'),
  createBarangay('Muzon 2', 'Muzon 2', 'Rosario'),
  createBarangay('Sapa 1', 'Sapa 1', 'Rosario'),
  createBarangay('Sapa 2', 'Sapa 2', 'Rosario'),
  createBarangay('Sapa 3', 'Sapa 3', 'Rosario'),
  createBarangay('Sapa 4', 'Sapa 4', 'Rosario'),
  createBarangay('Silangan 2', 'Silangan 2', 'Rosario'),
  createBarangay('Tejeros Convention', 'Tejeros Convention', 'Rosario'),
  createBarangay('Wawa 1', 'Wawa 1', 'Rosario'),
  createBarangay('Wawa 2', 'Wawa 2', 'Rosario'),
  createBarangay('Wawa 3', 'Wawa 3', 'Rosario'),


/** NAIC */
  createBarangay('Bagong Karsada', 'Bagong Karsada', 'Naic'),
  createBarangay('Balsahan', 'Balsahan', 'Naic'),
  createBarangay('Bancaan', 'Bancaan', 'Naic'),
  createBarangay('Bucana Malaki', 'Bucana Malaki', 'Naic'),
  createBarangay('Bucana Sasahan', 'Bucana Sasahan', 'naic'),
  createBarangay('Calubcob', 'Calubcob', 'Naic'),
  createBarangay('Capt. C. Nazareno', 'Capt. C. Nazareno', 'Naic'),
  createBarangay('Gomez-Zamora', 'Gomez-Zamora', 'Naic'),
  createBarangay('Halang', 'Halang', 'Naic'),
  createBarangay('Humbak', 'Humbak', 'Naic'),
  createBarangay('Ibayo Estacion', 'Ibayo Estacion', 'Naic'),
  createBarangay('Ibayo Silangan', 'Ibayo Silangan', 'Naic'),
  createBarangay('Kanluran', 'Kanluran', 'Naic'),
  createBarangay('Labac', 'Labac', 'Naic'),
  createBarangay('Latoria', 'Latoria', 'Naic'),
  createBarangay('Mabolo', 'Mabolo', 'Naic'),
  createBarangay('Makina', 'Makina', 'Naic'),
  createBarangay('Malainen Bago', 'Malainen Bago', 'Naic'),
  createBarangay('Malainen Luma', 'Malainen Luma', 'Naic'),
  createBarangay('Molino', 'Molino', 'Naic'),
  createBarangay('Palangue 1', 'Palangue 1', 'Naic'),
  createBarangay('Palangue 2 & 3', 'Palangue 2 & 3', 'Naic'),
  createBarangay('Sabang', 'Sabang', 'Naic'),
  createBarangay('San Roque', 'San Roque', 'Naic'),
  createBarangay('Santulan', 'Santulan', 'Naic'),
  createBarangay('Sapa', 'Sapa', 'Naic'),
  createBarangay('Timbalan Balsahan', 'Timbalan Balsahan', 'Naic'),
  createBarangay('Timbalan Concepcion', 'Timbalan Concepcion', 'Naic'),

/** NOVELETA */ 
  createBarangay('Magdiwang', 'Magdiwang', 'Noveleta'),
  createBarangay('Poblacion', 'Poblacion', 'Noveleta'),
  createBarangay('Salcedo I', 'Salcedo I', 'Noveleta'),
  createBarangay('Salcedo II', 'Salcedo II', 'Noveleta'),
  createBarangay('San Antonio I', 'San Antonio I', 'Noveleta'),
  createBarangay('San Antonio II', 'San Antonio II', 'Noveleta'),
  createBarangay('San Jose I', 'San Jose I', 'Noveleta'),
  createBarangay('San Jose II', 'San Jose II', 'Noveleta'),
  createBarangay('San Juan I', 'San Juan I', 'Noveleta'),
  createBarangay('San Juan II', 'San Juan II', 'Noveleta'),
  createBarangay('San Rafael I', 'San Rafael I', 'Noveleta'),
  createBarangay('San Rafael II', 'San Rafael II', 'Noveleta'),
  createBarangay('San Rafael III', 'San Rafael III', 'Noveleta'),
  createBarangay('San Rafael IV', 'San Rafael IV', 'Noveleta'),
  createBarangay('Santa Rosa I', 'Santa Rosa I', 'Noveleta'),
  createBarangay('Santa Rosa II', 'Santa Rosa II', 'Noveleta'),

/** TAGAYTAY */
  createBarangay('Asisan', 'Asisan', 'Tagaytay'),
  createBarangay('Bagong Tubig', 'Bagong Tubig', 'Tagaytay'),
  createBarangay('Calabuso', 'Calabuso', 'Tagaytay'),
  createBarangay('Dapdap East', 'Dapdap East', 'Tagaytay'),
  createBarangay('Dapdap West', 'Dapdap West', 'Tagaytay'),
  createBarangay('Francisco', 'Francisco', 'Tagaytay'),
  createBarangay('Guinhawa North', 'Guinhawa North', 'Tagaytay'),
  createBarangay('Guinhawa South', 'Guinhawa South', 'Tagaytay'),
  createBarangay('Iruhin East', 'Iruhin East', 'Tagaytay'),
  createBarangay('Iruhin South', 'Iruhin South', 'Tagaytay'),
  createBarangay('Iruhin West', 'Iruhin West', 'tTgaytay'),
  createBarangay('Kaybagal East', 'Kaybagal East', 'Tagaytay'),
  createBarangay('Kaybagal North', 'Kaybagal North', 'Tagaytay'),
  createBarangay('Kaybagal South', 'Kaybagal South', 'Tagaytay'),
  createBarangay('Mag-Asawang Ilat', 'Mag-Asawang Ilat', 'Tagaytay'),
  createBarangay('Maharlika East', 'Maharlika East', 'Tagaytay'),
  createBarangay('Maharlika West', 'Maharlika West', 'Tagaytay'),
  createBarangay('Maitim 2nd Central', 'Maitim 2nd Central', 'Tagaytay'),
  createBarangay('Maitim 2nd East', 'Maitim 2nd East', 'Tagaytay'),
  createBarangay('Maitim 2nd West', 'Maitim 2nd West', 'Tagaytay'),
  createBarangay('Mendez Crossing East', 'Mendez Crossing East', 'Tagaytay'),
  createBarangay('Mendez Crossing West', 'Mendez Crossing West', 'Tagaytay'),
  createBarangay('Neogan', 'Neogan', 'Tagaytay'),
  createBarangay('Patutong Malaki North', 'Patutong Malaki North', 'Tagaytay'),
  createBarangay('Patutong Malaki South', 'Patutong Malaki South', 'Tagaytay'),
  createBarangay('Sambong', 'Sambong', 'Tagaytay'),
  createBarangay('San Jose', 'San Jose', 'Tagaytay'),
  createBarangay('Silang Junction North', 'Silang Junction North', 'Tagaytay'),
  createBarangay('Silang Junction South', 'Silang Junction South', 'Tagaytay'),
  createBarangay('Sungay North', 'Sungay North', 'Tagaytay'),
  createBarangay('Sungay South', 'Sungay South', 'Tagaytay'),
  createBarangay('Tolentino East', 'Tolentino East', 'Tagaytay'),
  createBarangay('Tolentino West', 'Tolentino West', 'Tagaytay'),
  createBarangay('Zambal', 'Zambal', 'Tagaytay'),










];

/* UPDATES THE CITY DROPDOWN */
function updateCities() {
  var selectedProvince = provincesSelect.value;
  var options = cities.filter(function(city) {
    return city.province === selectedProvince;
  });
  
  removeOptions(citiesSelect);
  removeOptions(barangaysSelect);
  addOptions(citiesSelect, options);
}

/* UPDATES THE BARANGAY DROPDOWN BASED ON THE SELECTED CITY IN DROPDOWN*/
function updateBarangays() {
  var selectedCity = citiesSelect.value;
  var options = barangays.filter(function(barangay) {
    return barangay.city === selectedCity;
  });
  
  removeOptions(barangaysSelect);
  addOptions(barangaysSelect, options);
}

addOptions(provincesSelect, provinces);







/*SHOW PASSWORD */


$(document).ready(function() {
  $('#category').change(function(){

  var cat_id=$('#category').val();
    $('#sub-category').empty(); //remove all existing options
      $.get('ddck.php',{'cat_id':cat_id},function(return_data){
      $.each(return_data.data, function(key,value){
      $("#sub-category").append("<option value=" + value.subcat_id +">"+value.subcategory+"</option>");
      });
    }, "json");
  });
});
	
function myFunction() {
  var x = document.getElementById("myInput");
    if (x.type === "password") {
    x.type = "text";
    } else {
    x.type = "password";
  }
}

