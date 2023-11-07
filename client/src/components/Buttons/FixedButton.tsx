import Button from "@mui/material/Button";

export function FixedButton({ icon, onClick, bottom, right }: { icon: React.ReactNode, onClick: () => void , bottom: string, right: string}) {
    return (
        <div style={{ position: 'fixed', bottom: bottom, right: right }}>
            <Button variant="contained" color="primary"
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    minWidth: 'unset',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={onClick}
            >
                {icon}
            </Button>
        </div>
    );
}