import { Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppMenu() {
    return (
        <>
            <h1>
                Welcome to the expense tracker
            </h1>
            <div>
                <List>
                    <ListItem>
                        <Link to='/'>
                            <Button>Table</Button>
                        </Link>
                        <Link to='/summary'>
                            <Button>Summary</Button>
                        </Link>
                    </ListItem>
                </List>
            </div>
        </>
    );
}