import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function BackButton(props) {
    const {
        history
    } = props;

    const onGoBack = () => {
        history.goBack();
    }

    return (
        <div
            className={css(styles.backButton)}
            onClick={onGoBack}>
            <p className={css(styles.arrowIcon)}>←</p>
        </div>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 30,
        left: 50,
        width: 55,
        height: 55,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px #aaa',
        cursor: 'pointer',
        transition: 'box-shadow 200ms',
        ':hover': {
            boxShadow: '0 0 3px #aaa',
        },
        '@media(max-width: 480px)': {
            position: 'fixed',
            top: 'unset',
            bottom: 30,
            left: 10
        }
    },
    arrowIcon: {
        fontSize: 30,
        color: '#999',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '55px',
        transition: 'color 300ms',
        ':hover': {
            color: '#516C9D'
        }
    }
})