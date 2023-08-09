import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloudIcon from "@mui/icons-material/Cloud";

export const appName = {
  title: "Maratha Bank",
};

export const roles = {
  CUSTOMER: "CUSTOMER",
  MANAGER: "MANAGER",
};

export const genders = {
  Male: "Male",
  Female: "Female",
};

export const account = {
  SAVINGS: "SAVINGS",
  CURRENT: "Current",
  LOAN: "Loan",
};

export const creditCards = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  RUPAY: "RUPAY",
};

export const giftCards = {
  AMAZON: "AMAZON",
  STARBUCKS: "STARBUCKS",
  ITUNES: "ITUNES",
  GOOGLE_PLAY: "GOOGLE_PLAY",
};

export const lockerSizes = {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
  EXTRA_LARGE: "Extra large",
};

export const lockerTypes = {
  Temporary: "Temporary",
  Personal: "Personal",
  Self_Deposit: "Self_Deposit",
  Business: "Business",
  Shared: "Shared",
  Digital: "Digital",
  Keyless: "Keyless",
};

export const products = [
  {
    id: 1,
    name: "Transaction",
    icon: (
      <AccountBalanceIcon style={{ marginTop: "10px", fontSize: "38px" }} />
    ),
    to: "/transaction",
  },
  {
    id: 2,
    name: "Loan",
    icon: <CurrencyRupeeIcon style={{ marginTop: "10px", fontSize: "38px" }} />,
    to: "/loan",
  },
  {
    id: 3,
    name: "Credit Cards",
    icon: <CreditScoreIcon style={{ marginTop: "10px", fontSize: "38px" }} />,
    to: "/credit",
  },
  {
    id: 4,
    name: "Gift Cards",
    icon: <CardGiftcardIcon style={{ marginTop: "10px", fontSize: "38px" }} />,
    to: "/gift",
  },
  {
    id: 5,
    name: "Locker",
    icon: <LockPersonIcon style={{ marginTop: "10px", fontSize: "38px" }} />,
    to: "/locker",
  },
  {
    id: 6,
    name: "Weather",
    icon: <CloudIcon style={{ marginTop: "10px", fontSize: "38px" }} />,
    to: "/weather",
  },
];

export const news = [
  { id: 1, name: "Agriculture News", to: "/agriculture-news" },
  { id: 2, name: "Local News", to: "/local-news" },
];

export const socials = [
  { id: 1, icon: <FacebookIcon />, url: "https://www.facebook.com/axisbank" },
  {
    id: 2,
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/company/axis-bank/?originalSubdomain=in",
  },
  { id: 3, icon: <TwitterIcon />, url: "https://twitter.com/AxisBank" },
  { id: 4, icon: <YouTubeIcon />, url: "https://www.youtube.com/@AxisBank" },
  {
    id: 5,
    icon: <InstagramIcon />,
    url: "https://www.instagram.com/axis_bank/",
  },
];

export const CommunityDropdown = [
  { id: 1, name: "Create", to: "/publish" },
  { id: 2, name: "Feed", to: "/feed" },
];
