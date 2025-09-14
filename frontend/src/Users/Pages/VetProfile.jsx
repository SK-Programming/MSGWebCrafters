import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  TextField,
  Button,
  Rating,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function VetProfiles() {
  const vet = [
    {
      id: 1,
      name: "Dr. John Smith",
      role: "Veterinarian",
      email: "dr.johnsmith1@example.com",
      phone: "+92 3000000101",
      address: "Street 1, Karachi",
      rating: 4.5,
      experience: "10 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      totalPets: 30,
      memberSince: "March 2012",
    },
    {
      id: 2,
      name: "Dr. Sarah Lee",
      role: "Veterinarian",
      email: "dr.sarahlee2@example.com",
      phone: "+92 3000000102",
      address: "Street 2, Lahore",
      rating: 4.7,
      experience: "8 years",
      specialization: "Small Pets",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      totalPets: 25,
      memberSince: "June 2015",
    },
    {
      id: 3,
      name: "Dr. Ahmed Khan",
      role: "Veterinarian",
      email: "dr.ahmedkhan3@example.com",
      phone: "+92 3000000103",
      address: "North Nazimabad, Karachi",
      rating: 4.2,
      experience: "6 years",
      specialization: "Exotic Animals",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      totalPets: 15,
      memberSince: "January 2018",
    },
    {
      id: 4,
      name: "Dr. Maria Ali",
      role: "Veterinarian",
      email: "dr.mariaali4@example.com",
      phone: "+92 3000000104",
      address: "Clifton, Karachi",
      rating: 4.9,
      experience: "12 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      totalPets: 40,
      memberSince: "May 2010",
    },
    {
      id: 5,
      name: "Dr. Bilal Chaudhry",
      role: "Veterinarian",
      email: "dr.bilalchaudhry5@example.com",
      phone: "+92 3000000105",
      address: "DHA Phase 5, Karachi",
      rating: 4.3,
      experience: "7 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      totalPets: 28,
      memberSince: "August 2013",
    },
    {
      id: 6,
      name: "Dr. Fatima Noor",
      role: "Veterinarian",
      email: "dr.fatimanoor6@example.com",
      phone: "+92 3000000106",
      address: "PECHS, Karachi",
      rating: 4.8,
      experience: "9 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      totalPets: 20,
      memberSince: "November 2014",
    },
    {
      id: 7,
      name: "Dr. Zeeshan Raza",
      role: "Veterinarian",
      email: "dr.zeeshanraza7@example.com",
      phone: "+92 3000000107",
      address: "Korangi, Karachi",
      rating: 4.1,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      totalPets: 18,
      memberSince: "March 2019",
    },
    {
      id: 8,
      name: "Dr. Ayesha Siddiqui",
      role: "Veterinarian",
      email: "dr.ayeshasiddiqui8@example.com",
      phone: "+92 3000000108",
      address: "Gulistan‑e‑Jauhar, Karachi",
      rating: 4.6,
      experience: "11 years",
      specialization: "Reptiles",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      totalPets: 35,
      memberSince: "February 2012",
    },
    {
      id: 9,
      name: "Dr. Noorulain Hassan",
      role: "Veterinarian",
      email: "dr.noorulain9@example.com",
      phone: "+92 3000000109",
      address: "Nazimabad, Karachi",
      rating: 4.0,
      experience: "4 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      totalPets: 22,
      memberSince: "July 2020",
    },
    {
      id: 10,
      name: "Dr. Omar Latif",
      role: "Veterinarian",
      email: "dr.omarlatif10@example.com",
      phone: "+92 3000000110",
      address: "Malir, Karachi",
      rating: 4.4,
      experience: "8 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      totalPets: 26,
      memberSince: "April 2016",
    },
    {
      id: 11,
      name: "Dr. Sana Mir",
      role: "Veterinarian",
      email: "dr.sanamir11@example.com",
      phone: "+92 3000000111",
      address: "Lyari, Karachi",
      rating: 4.2,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      totalPets: 19,
      memberSince: "June 2018",
    },
    {
      id: 12,
      name: "Dr. Haris Iqbal",
      role: "Veterinarian",
      email: "dr.harisIqbal12@example.com",
      phone: "+92 3000000112",
      address: "Federal B Area, Karachi",
      rating: 3.9,
      experience: "3 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      totalPets: 14,
      memberSince: "January 2021",
    },
    {
      id: 13,
      name: "Dr. Nadia Qureshi",
      role: "Veterinarian",
      email: "dr.nadiaqureshi13@example.com",
      phone: "+92 3000000113",
      address: "Shahrah‑e‑Faisal, Karachi",
      rating: 4.8,
      experience: "12 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/13.jpg",
      totalPets: 42,
      memberSince: "March 2010",
    },
    {
      id: 14,
      name: "Dr. Usman Aziz",
      role: "Veterinarian",
      email: "dr.usmanaziz14@example.com",
      phone: "+92 3000000114",
      address: "Gulberg, Lahore",
      rating: 4.3,
      experience: "7 years",
      specialization: "Exotic Animals",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
      totalPets: 24,
      memberSince: "May 2015",
    },
    {
      id: 15,
      name: "Dr. Farah Malik",
      role: "Veterinarian",
      email: "dr.farahmalik15@example.com",
      phone: "+92 3000000115",
      address: "Johar Town, Lahore",
      rating: 4.6,
      experience: "10 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
      totalPets: 38,
      memberSince: "October 2012",
    },
    {
      id: 16,
      name: "Dr. Imran Shah",
      role: "Veterinarian",
      email: "dr.imranshah16@example.com",
      phone: "+92 3000000116",
      address: "Model Town, Lahore",
      rating: 4.1,
      experience: "6 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/16.jpg",
      totalPets: 20,
      memberSince: "July 2018",
    },
    {
      id: 17,
      name: "Dr. Amina Yasir",
      role: "Veterinarian",
      email: "dr.aminayasir17@example.com",
      phone: "+92 3000000117",
      address: "Khayaban‑e‑Amin, Lahore",
      rating: 4.9,
      experience: "14 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      totalPets: 50,
      memberSince: "February 2009",
    },
    {
      id: 18,
      name: "Dr. Haroon Abbas",
      role: "Veterinarian",
      email: "dr.haroonabbas18@example.com",
      phone: "+92 3000000118",
      address: "Defence, Lahore",
      rating: 4.4,
      experience: "9 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/men/18.jpg",
      totalPets: 30,
      memberSince: "August 2013",
    },
    {
      id: 19,
      name: "Dr. Sehrish Iftikhar",
      role: "Veterinarian",
      email: "dr.sehrishiftikhar19@example.com",
      phone: "+92 3000000119",
      address: "Satellite Town, Rawalpindi",
      rating: 4.5,
      experience: "8 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/19.jpg",
      totalPets: 27,
      memberSince: "March 2016",
    },
    {
      id: 20,
      name: "Dr. Kamran Nadeem",
      role: "Veterinarian",
      email: "dr.kamrannadeem20@example.com",
      phone: "+92 3000000120",
      address: "G‑6/2, Islamabad",
      rating: 4.0,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      totalPets: 22,
      memberSince: "January 2019",
    },
    {
      id: 21,
      name: "Dr. Lubna Javed",
      role: "Veterinarian",
      email: "dr.lubnajaved21@example.com",
      phone: "+92 3000000121",
      address: "Sector E, Islamabad",
      rating: 4.8,
      experience: "12 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      totalPets: 33,
      memberSince: "April 2012",
    },
    {
      id: 22,
      name: "Dr. Zain Malik",
      role: "Veterinarian",
      email: "dr.zainmalik22@example.com",
      phone: "+92 3000000122",
      address: "Sector F‑11, Islamabad",
      rating: 4.3,
      experience: "7 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      totalPets: 29,
      memberSince: "September 2014",
    },
    {
      id: 23,
      name: "Dr. Bushra Ijaz",
      role: "Veterinarian",
      email: "dr.bushraijaz23@example.com",
      phone: "+92 3000000123",
      address: "Adiala Road, Rawalpindi",
      rating: 4.1,
      experience: "6 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      totalPets: 18,
      memberSince: "July 2017",
    },
    {
      id: 24,
      name: "Dr. Danish Qamar",
      role: "Veterinarian",
      email: "dr.danishqamar24@example.com",
      phone: "+92 3000000124",
      address: "Cantt, Rawalpindi",
      rating: 4.6,
      experience: "9 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/24.jpg",
      totalPets: 34,
      memberSince: "November 2012",
    },
    {
      id: 25,
      name: "Dr. Nadia Khan",
      role: "Veterinarian",
      email: "dr.nadiakhan25@example.com",
      phone: "+92 3000000125",
      address: "G‑8/3, Islamabad",
      rating: 4.4,
      experience: "8 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
      totalPets: 27,
      memberSince: "May 2015",
    },
    {
      id: 26,
      name: "Dr. Rashid Ali",
      role: "Veterinarian",
      email: "dr.rashidali26@example.com",
      phone: "+92 3000000126",
      address: "Faisalabad, Punjab",
      rating: 4.0,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/26.jpg",
      totalPets: 21,
      memberSince: "February 2019",
    },
    {
      id: 27,
      name: "Dr. Sumaira Noor",
      role: "Veterinarian",
      email: "dr.sumairanoor27@example.com",
      phone: "+92 3000000127",
      address: "Garden Town, Lahore",
      rating: 4.7,
      experience: "10 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/27.jpg",
      totalPets: 39,
      memberSince: "October 2013",
    },
    {
      id: 28,
      name: "Dr. Waqar Husnain",
      role: "Veterinarian",
      email: "dr.waqarhusnain28@example.com",
      phone: "+92 3000000128",
      address: "Allama Iqbal Town, Lahore",
      rating: 4.2,
      experience: "7 years",
      specialization: "Exotic Animals",
      image: "https://randomuser.me/api/portraits/men/28.jpg",
      totalPets: 25,
      memberSince: "June 2016",
    },
    {
      id: 29,
      name: "Dr. Nishat Fatima",
      role: "Veterinarian",
      email: "dr.nishatfatima29@example.com",
      phone: "+92 3000000129",
      address: "DHA, Karachi",
      rating: 4.9,
      experience: "11 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      totalPets: 45,
      memberSince: "April 2010",
    },
    {
      id: 30,
      name: "Dr. Haris Rafique",
      role: "Veterinarian",
      email: "dr.harisrafique30@example.com",
      phone: "+92 3000000130",
      address: "PECHS, Karachi",
      rating: 4.0,
      experience: "4 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      totalPets: 17,
      memberSince: "September 2021",
    },
    {
      id: 31,
      name: "Dr. Areeba Shah",
      role: "Veterinarian",
      email: "dr.areebashah31@example.com",
      phone: "+92 3000000131",
      address: "Gulshan‑e‑Iqbal, Karachi",
      rating: 4.2,
      experience: "6 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/31.jpg",
      totalPets: 24,
      memberSince: "March 2019",
    },
    {
      id: 32,
      name: "Dr. Faisal Riaz",
      role: "Veterinarian",
      email: "dr.faisalriaz32@example.com",
      phone: "+92 3000000132",
      address: "Johar Town, Lahore",
      rating: 4.3,
      experience: "7 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      totalPets: 32,
      memberSince: "January 2014",
    },
    {
      id: 33,
      name: "Dr. Mehwish Anwar",
      role: "Veterinarian",
      email: "dr.mehwishanwar33@example.com",
      phone: "+92 3000000133",
      address: "G‑11/3, Islamabad",
      rating: 4.6,
      experience: "9 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      totalPets: 29,
      memberSince: "July 2015",
    },
    {
      id: 34,
      name: "Dr. Saad Butt",
      role: "Veterinarian",
      email: "dr.saadbutt34@example.com",
      phone: "+92 3000000134",
      address: "Johar, Karachi",
      rating: 4.1,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      totalPets: 20,
      memberSince: "October 2018",
    },
    {
      id: 35,
      name: "Dr. Farzana Parveen",
      role: "Veterinarian",
      email: "dr.farzanaparveen35@example.com",
      phone: "+92 3000000135",
      address: "Model Town, Lahore",
      rating: 4.7,
      experience: "11 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      totalPets: 44,
      memberSince: "May 2012",
    },
    {
      id: 36,
      name: "Dr. Shahid Afzal",
      role: "Veterinarian",
      email: "dr.shahidafzal36@example.com",
      phone: "+92 3000000136",
      address: "Gulberg, Lahore",
      rating: 4.3,
      experience: "8 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      totalPets: 26,
      memberSince: "September 2013",
    },
    {
      id: 37,
      name: "Dr. Rida Khan",
      role: "Veterinarian",
      email: "dr.ridakhan37@example.com",
      phone: "+92 3000000137",
      address: "DHA Phase 8, Karachi",
      rating: 4.9,
      experience: "13 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/37.jpg",
      totalPets: 50,
      memberSince: "March 2009",
    },
    {
      id: 38,
      name: "Dr. Arif Mahmood",
      role: "Veterinarian",
      email: "dr.arifmahmood38@example.com",
      phone: "+92 3000000138",
      address: "Bahria Town, Lahore",
      rating: 4.2,
      experience: "6 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/men/38.jpg",
      totalPets: 23,
      memberSince: "July 2017",
    },
    {
      id: 39,
      name: "Dr. Iqra Shah",
      role: "Veterinarian",
      email: "dr.iqrashah39@example.com",
      phone: "+92 3000000139",
      address: "Goraa Bazaar, Peshawar",
      rating: 4.4,
      experience: "7 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/39.jpg",
      totalPets: 29,
      memberSince: "May 2016",
    },
    {
      id: 40,
      name: "Dr. Talha Qazi",
      role: "Veterinarian",
      email: "dr.talhaqazi40@example.com",
      phone: "+92 3000000140",
      address: "Hayatabad, Peshawar",
      rating: 4.0,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      totalPets: 22,
      memberSince: "February 2020",
    },
    {
      id: 41,
      name: "Dr. Shazia Butt",
      role: "Veterinarian",
      email: "dr.shaziabutt41@example.com",
      phone: "+92 3000000141",
      address: "Saddar, Karachi",
      rating: 4.6,
      experience: "9 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
      totalPets: 32,
      memberSince: "April 2015",
    },
    {
      id: 42,
      name: "Dr. Aftab Mirza",
      role: "Veterinarian",
      email: "dr.aftabmirza42@example.com",
      phone: "+92 3000000142",
      address: "Lahore Fort, Lahore",
      rating: 4.3,
      experience: "7 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      totalPets: 28,
      memberSince: "September 2014",
    },
    {
      id: 43,
      name: "Dr. Zehra Tariq",
      role: "Veterinarian",
      email: "dr.zehratariq43@example.com",
      phone: "+92 3000000143",
      address: "Cantt, Rawalpindi",
      rating: 4.8,
      experience: "12 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      totalPets: 46,
      memberSince: "June 2011",
    },
    {
      id: 44,
      name: "Dr. Sameer Rauf",
      role: "Veterinarian",
      email: "dr.sameerrauf44@example.com",
      phone: "+92 3000000144",
      address: "Sialkot, Punjab",
      rating: 4.1,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      totalPets: 21,
      memberSince: "August 2019",
    },
    {
      id: 45,
      name: "Dr. Anum Shahid",
      role: "Veterinarian",
      email: "dr.anumshahid45@example.com",
      phone: "+92 3000000145",
      address: "Gujranwala, Punjab",
      rating: 4.5,
      experience: "8 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      totalPets: 30,
      memberSince: "July 2016",
    },
    {
      id: 46,
      name: "Dr. Khalid Mehmood",
      role: "Veterinarian",
      email: "dr.khalidmehmood46@example.com",
      phone: "+92 3000000146",
      address: "Bahawalpur, Punjab",
      rating: 4.2,
      experience: "7 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      totalPets: 25,
      memberSince: "October 2014",
    },
    {
      id: 47,
      name: "Dr. Nadia Saeed",
      role: "Veterinarian",
      email: "dr.nadiasaeed47@example.com",
      phone: "+92 3000000147",
      address: "Multan, Punjab",
      rating: 4.7,
      experience: "10 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      totalPets: 38,
      memberSince: "March 2013",
    },
    {
      id: 48,
      name: "Dr. Osman Qureshi",
      role: "Veterinarian",
      email: "dr.osmanqureshi48@example.com",
      phone: "+92 3000000148",
      address: "Quetta, Balochistan",
      rating: 4.0,
      experience: "5 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      totalPets: 20,
      memberSince: "February 2020",
    },
    {
      id: 49,
      name: "Dr. Salma Iqbal",
      role: "Veterinarian",
      email: "dr.salmaiqlab49@example.com",
      phone: "+92 3000000149",
      address: "Peshawar, KP",
      rating: 4.4,
      experience: "6 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/women/49.jpg",
      totalPets: 24,
      memberSince: "June 2018",
    },
    {
      id: 50,
      name: "Dr. Faisal Khan",
      role: "Veterinarian",
      email: "dr.faisalkhan50@example.com",
      phone: "+92 3000000150",
      address: "Murree, Punjab",
      rating: 4.3,
      experience: "7 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      totalPets: 29,
      memberSince: "September 2014",
    },
    {
      id: 51,
      name: "Dr. Mehreen Farooq",
      role: "Veterinarian",
      email: "dr.mehreenfarooq51@example.com",
      phone: "+92 3000000151",
      address: "Skardu, GB",
      rating: 4.6,
      experience: "10 years",
      specialization: "Exotic Animals",
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      totalPets: 33,
      memberSince: "April 2013",
    },
    {
      id: 52,
      name: "Dr. Altamash Rauf",
      role: "Veterinarian",
      email: "dr.altamashrauf52@example.com",
      phone: "+92 3000000152",
      address: "Gwadar, Balochistan",
      rating: 3.9,
      experience: "4 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      totalPets: 19,
      memberSince: "December 2019",
    },
    {
      id: 53,
      name: "Dr. Zeenat Bibi",
      role: "Veterinarian",
      email: "dr.zeenatbibi53@example.com",
      phone: "+92 3000000153",
      address: "Hyderabad, Sindh",
      rating: 4.2,
      experience: "6 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      totalPets: 26,
      memberSince: "July 2017",
    },
    {
      id: 54,
      name: "Dr. Yasin Abbas",
      role: "Veterinarian",
      email: "dr.yasinabbas54@example.com",
      phone: "+92 3000000154",
      address: "Sukkur, Sindh",
      rating: 4.0,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      totalPets: 23,
      memberSince: "February 2020",
    },
    {
      id: 55,
      name: "Dr. Roshni Tariq",
      role: "Veterinarian",
      email: "dr.roshnitariq55@example.com",
      phone: "+92 3000000155",
      address: "Larkana, Sindh",
      rating: 4.5,
      experience: "8 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      totalPets: 28,
      memberSince: "May 2016",
    },
    {
      id: 56,
      name: "Dr. Junaid Sheikh",
      role: "Veterinarian",
      email: "dr.junaidsheikh56@example.com",
      phone: "+92 3000000156",
      address: "Swat, KP",
      rating: 4.3,
      experience: "7 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      totalPets: 31,
      memberSince: "June 2015",
    },
    {
      id: 57,
      name: "Dr. Mahnoor Farid",
      role: "Veterinarian",
      email: "dr.mahnoorfari57@example.com",
      phone: "+92 3000000157",
      address: "Gilgit, GB",
      rating: 4.8,
      experience: "12 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/women/57.jpg",
      totalPets: 35,
      memberSince: "March 2012",
    },
    {
      id: 58,
      name: "Dr. Fahad Mehmood",
      role: "Veterinarian",
      email: "dr.fahadmehmood58@example.com",
      phone: "+92 3000000158",
      address: "Chitral, KP",
      rating: 4.2,
      experience: "6 years",
      specialization: "Dogs",
      image: "https://randomuser.me/api/portraits/men/58.jpg",
      totalPets: 25,
      memberSince: "July 2017",
    },
    {
      id: 59,
      name: "Dr. Samina Rashid",
      role: "Veterinarian",
      email: "dr.saminarashid59@example.com",
      phone: "+92 3000000159",
      address: "Quetta, Balochistan",
      rating: 4.4,
      experience: "8 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/59.jpg",
      totalPets: 29,
      memberSince: "October 2014",
    },
    {
      id: 60,
      name: "Dr. Arslan Ghazi",
      role: "Veterinarian",
      email: "dr.arslanghazi60@example.com",
      phone: "+92 3000000160",
      address: "Kasur, Punjab",
      rating: 4.0,
      experience: "5 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      totalPets: 20,
      memberSince: "January 2019",
    },
    {
      id: 61,
      name: "Dr. Hina Noor",
      role: "Veterinarian",
      email: "dr.hinainoor61@example.com",
      phone: "+92 3000000161",
      address: "Bahawalnagar, Punjab",
      rating: 4.6,
      experience: "9 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/women/61.jpg",
      totalPets: 27,
      memberSince: "May 2015",
    },
    {
      id: 62,
      name: "Dr. Bilal Hashmi",
      role: "Veterinarian",
      email: "dr.bilalhashmi62@example.com",
      phone: "+92 3000000162",
      address: "Dera Ghazi Khan, Punjab",
      rating: 4.2,
      experience: "7 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      totalPets: 32,
      memberSince: "November 2013",
    },
    {
      id: 63,
      name: "Dr. Sameena Altaf",
      role: "Veterinarian",
      email: "dr.sameenaaltaf63@example.com",
      phone: "+92 3000000163",
      address: "Hyderabad, Sindh",
      rating: 4.7,
      experience: "10 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      totalPets: 41,
      memberSince: "April 2011",
    },
    {
      id: 64,
      name: "Dr. Usman Ghani",
      role: "Veterinarian",
      email: "dr.usmanghani64@example.com",
      phone: "+92 3000000164",
      address: "Sahiwal, Punjab",
      rating: 4.3,
      experience: "8 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      totalPets: 29,
      memberSince: "July 2014",
    },
    {
      id: 65,
      name: "Dr. Rabia Malik",
      role: "Veterinarian",
      email: "dr.rabiamalik65@example.com",
      phone: "+92 3000000165",
      address: "Kasur, Punjab",
      rating: 4.1,
      experience: "6 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      totalPets: 23,
      memberSince: "December 2018",
    },
    {
      id: 66,
      name: "Dr. Khurram Sheikh",
      role: "Veterinarian",
      email: "dr.khurramsheikh66@example.com",
      phone: "+92 3000000166",
      address: "Rawalakot, Azad Kashmir",
      rating: 4.5,
      experience: "9 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/66.jpg",
      totalPets: 36,
      memberSince: "March 2012",
    },
    {
      id: 67,
      name: "Dr. Aliya Hassan",
      role: "Veterinarian",
      email: "dr.aliyahassan67@example.com",
      phone: "+92 3000000167",
      address: "Ziarat, Balochistan",
      rating: 4.2,
      experience: "7 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      totalPets: 20,
      memberSince: "July 2016",
    },
    {
      id: 68,
      name: "Dr. Zeeshan Mustafa",
      role: "Veterinarian",
      email: "dr.zeeshanmustafa68@example.com",
      phone: "+92 3000000168",
      address: "Gilgit, GB",
      rating: 4.3,
      experience: "8 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      totalPets: 28,
      memberSince: "October 2014",
    },
    {
      id: 69,
      name: "Dr. Hira Shah",
      role: "Veterinarian",
      email: "dr.hirashah69@example.com",
      phone: "+92 3000000169",
      address: "Hunza, GB",
      rating: 4.7,
      experience: "11 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/women/69.jpg",
      totalPets: 30,
      memberSince: "April 2012",
    },
    {
      id: 70,
      name: "Dr. Danish Iqbal",
      role: "Veterinarian",
      email: "dr.danishiqbal70@example.com",
      phone: "+92 3000000170",
      address: "Faisalabad, Punjab",
      rating: 4.4,
      experience: "8 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/70.jpg",
      totalPets: 37,
      memberSince: "May 2013",
    },
    {
      id: 71,
      name: "Dr. Sidra Javed",
      role: "Veterinarian",
      email: "dr.sidrajaved71@example.com",
      phone: "+92 3000000171",
      address: "Sialkot, Punjab",
      rating: 4.1,
      experience: "5 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/71.jpg",
      totalPets: 22,
      memberSince: "January 2019",
    },
    {
      id: 72,
      name: "Dr. Tayyab Hussain",
      role: "Veterinarian",
      email: "dr.tayyabhussain72@example.com",
      phone: "+92 3000000172",
      address: "Mardan, KP",
      rating: 4.5,
      experience: "9 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/72.jpg",
      totalPets: 33,
      memberSince: "July 2014",
    },
    {
      id: 73,
      name: "Dr. Rumaisa Khan",
      role: "Veterinarian",
      email: "dr.rumaisakhan73@example.com",
      phone: "+92 3000000173",
      address: "Abbottabad, KP",
      rating: 4.2,
      experience: "6 years",
      specialization: "Birds",
      image: "https://randomuser.me/api/portraits/women/73.jpg",
      totalPets: 24,
      memberSince: "December 2017",
    },
    {
      id :74,
      name: "Dr. Farid Siddiqui",
      role: "Veterinarian",
      email: "dr.faridsiddiqui74@example.com",
      phone: "+92 3000000174",
      address: "Chiniot, Punjab",
      rating: 4.0,
      experience: "5 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/men/74.jpg",
      totalPets: 20,
      memberSince: "February 2020",
    },
    {
      id: 75,
      name: "Dr. Naima Ghani",
      role: "Veterinarian",
      email: "dr.naimaghani75@example.com",
      phone: "+92 3000000175",
      address: "Rahim Yar Khan, Punjab",
      rating: 4.7,
      experience: "10 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      totalPets: 36,
      memberSince: "May 2012",
    },
    {
      id: 76,
      name: "Dr. Kashif Ilyas",
      role: "Veterinarian",
      email: "dr.kashifilyas76@example.com",
      phone: "+92 3000000176",
      address: "Mianwali, Punjab",
      rating: 4.3,
      experience: "7 years",
      specialization: "Small Animals",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      totalPets: 25,
      memberSince: "September 2015",
    },
    {
      id: 77,
      name: "Dr. Beenish Tariq",
      role: "Veterinarian",
      email: "dr.beenishtariq77@example.com",
      phone: "+92 3000000177",
      address: "Muzaffarabad, Azad Kashmir",
      rating: 4.6,
      experience: "9 years",
      specialization: "Cats",
      image: "https://randomuser.me/api/portraits/women/77.jpg",
      totalPets: 29,
      memberSince: "March 2014",
    },
    {
      id: 78,
      name: "Dr. Salman Farooq",
      role: "Veterinarian",
      email: "dr.salmanfarooq78@example.com",
      phone: "+92 3000000178",
      address: "Swabi, KP",
      rating: 4.2,
      experience: "6 years",
      specialization: "Birds & Exotics",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      totalPets: 23,
      memberSince: "October 2017",
    },
    {
      id: 79,
      name: "Dr. Zara Malik",
      role: "Veterinarian",
      email: "dr.zaramalik79@example.com",
      phone: "+92 3000000179",
      address: "Dera Ismail Khan, KP",
      rating: 4.4,
      experience: "8 years",
      specialization: "Livestock",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
      totalPets: 27,
      memberSince: "June 2018",
    },
    {
      id: 80,
      name: "Dr. Danish Baloch",
      role: "Veterinarian",
      email: "dr.danishbaloch80@example.com",
      phone: "+92 3000000180",
      address: "Gwadar, Balochistan",
      rating: 4.1,
      experience: "5 years",
      specialization: "Dogs & Cats",
      image: "https://randomuser.me/api/portraits/men/80.jpg",
      totalPets: 22,
      memberSince: "January 2019",
    },
  ];
  
  // Reviews state
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 5, comment: "Dr. John is amazing! He took great care of my dog." },
    { id: 2, name: "Michael", rating: 4, comment: "Very kind and professional vet." },
  ]);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // Appointment modal state
  const [openModal, setOpenModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleSubmitReview = () => {
    if (!newName || !newComment || newRating === 0) return;
    const newReview = {
      id: Date.now(),
      name: newName,
      rating: newRating,
      comment: newComment,
    };
    setReviews([newReview, ...reviews]);
    setNewName("");
    setNewRating(0);
    setNewComment("");
  };

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleBookAppointment = () => {
    if (!appointmentDate || !appointmentTime) return;
    alert(
      `Appointment booked with ${vet.name} on ${appointmentDate.toLocaleDateString()} at ${appointmentTime}`
    );
    setOpenModal(false);
    setAppointmentDate(null);
    setAppointmentTime("");
  };

  return (
    <Box sx={{ pt: 12, px: { xs: 2, sm: 3, md: 6 }, maxWidth: "900px", mx: "auto" }}>
    {/* Vet Info */}
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={6}
      alignItems={{ xs: "center", md: "flex-start" }}
      sx={{ mb: 8 }}
    >
      <Box sx={{ textAlign: "center", flexShrink: 0 }}>
        <Avatar src={vet[0].image} sx={{ width: 160, height: 160, mx: "auto", mb: 3 }} />
      </Box>
  
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          {vet[0].name}
        </Typography>
        <Rating value={avgRating || 0} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Average Rating: {(avgRating || 0).toFixed(1)} ⭐ ({reviews.length} reviews)
        </Typography>
        {/* If you want to add description, add it in your vet data or remove this line */}
        {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          {vet[0].description}
        </Typography> */}
  
        <Stack spacing={1} sx={{ mt: 3, mb: 3 }}>
          <Typography>
            <strong>Email:</strong> {vet[0].email}
          </Typography>
          <Typography>
            <strong>Address:</strong> {vet[0].address}
          </Typography>
          <Typography>
            <strong>Experience:</strong> {vet[0].experience}
          </Typography>
          <Typography>
            <strong>Joined:</strong> {vet[0].memberSince}
          </Typography>
        </Stack>
  
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Book Appointment
        </Button>
      </Box>
    </Stack>
  
    {/* Reviews */}
    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
      What Our Patients Say
    </Typography>
  
    {/* Review Form */}
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Leave a Review
      </Typography>
      <TextField
        label="Your Name"
        fullWidth
        sx={{ mb: 2 }}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Rating value={newRating} onChange={(e, newValue) => setNewRating(newValue)} sx={{ mb: 2 }} />
      <TextField
        label="Your Review"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmitReview}>
        Submit Review
      </Button>
    </Paper>
  
    <Stack spacing={2}>
      {reviews.map((review) => (
        <Paper key={review.id} sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {review.name}
          </Typography>
          <Rating value={review.rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {review.comment}
          </Typography>
        </Paper>
      ))}
    </Stack>
  
    {/* Appointment Modal */}
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      PaperProps={{ sx: { borderRadius: 3, p: 2, width: "420px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.4rem" }}>
        Book Appointment
      </DialogTitle>
  
      <DialogContent sx={{ mt: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={appointmentDate}
            onChange={(newDate) => setAppointmentDate(newDate)}
            slotProps={{
              actionBar: { actions: [] },
            }}
          />
        </LocalizationProvider>
  
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
          Select Time Slot
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {timeSlots.map((slot) => (
            <Chip
              key={slot}
              label={slot}
              clickable
              color={appointmentTime === slot ? "primary" : "default"}
              onClick={() => setAppointmentTime(slot)}
            />
          ))}
        </Stack>
      </DialogContent>
  
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={() => setOpenModal(false)} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleBookAppointment}
          sx={{
            borderRadius: 2,
            background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  
  );
}

export default VetProfiles;
