import Board from '../components/Board'
import Card from '../components/Card'

export default function GameScreen() {
    return (
        <Board children={
            <>
                <Card revealed={true} content="A" />
                <Card revealed={false} content="B" />
                <Card revealed={false} content="C" />
                <Card revealed={false} content="D" />
                <Card revealed={true} content="E" />
                <Card revealed={false} content="F" />
                <Card revealed={true} content="G" />
                <Card revealed={true} content="H" />
                <Card revealed={true} content="I" />
                <Card revealed={false} content="J" />
                <Card revealed={false} content="K" />
                <Card revealed={false} content="L" />
                <Card revealed={true} content="M" />
                <Card revealed={true} content="N" />
                <Card revealed={false} content="O" />
                <Card revealed={true} content="P" />
            </>
        } />
    )
}
